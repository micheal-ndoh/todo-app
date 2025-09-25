terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  required_version = ">= 1.0"
}

provider "aws" {
  region = var.aws_region
}

# ECR Repository
resource "aws_ecr_repository" "main" {
  name                 = var.app_name
  image_tag_mutability = "MUTABLE"
  force_delete         = true

  image_scanning_configuration {
    scan_on_push = true
  }
}

# Push Docker image to ECR
locals {
  repo_url = aws_ecr_repository.main.repository_url
}

data "archive_file" "source" {
  type        = "zip"
  source_dir  = ".."
  output_path = "/tmp/source.zip"
  excludes = [
    ".terraform",
    ".git",
    "infrastructure/terraform.tfstate.d",
    "infrastructure/.terraform.lock.hcl",
    "node_modules",
    ".next"
  ]
}

resource "null_resource" "docker_push" {
  depends_on = [aws_ecr_repository.main]

  triggers = {
    source_code_hash = data.archive_file.source.output_sha
  }

  provisioner "local-exec" {
    command = <<EOT
      aws ecr get-login-password --region ${var.aws_region} | docker login --username AWS --password-stdin ${local.repo_url}
      cd ..
      docker build --platform linux/amd64 -t ${local.repo_url}:latest .
      docker push ${local.repo_url}:latest
      cd infrastructure
    EOT
  }
}

data "aws_ecr_image" "latest" {
  repository_name = aws_ecr_repository.main.name
  image_tag       = "latest"
  depends_on      = [null_resource.docker_push]
}

# VPC

############################################
# Lambda from ECR image + Function URL
############################################

data "aws_iam_policy_document" "lambda_assume" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "lambda_execution" {
  name               = "${var.app_name}-lambda-exec"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume.json
}

resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.lambda_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}


resource "aws_lambda_function" "web" {
  function_name = var.app_name
  role          = aws_iam_role.lambda_execution.arn
  package_type  = "Image"
  image_uri     = "${local.repo_url}:latest"
  architectures = ["x86_64"]
  timeout       = 30
  memory_size   = 1024

  environment {
    variables = {
      PORT                = "3000"
      RUST_LOG            = "info"
      AWS_LWA_INVOKE_MODE = "buffered"
          }
  }

  
  depends_on = [data.aws_ecr_image.latest, aws_iam_role_policy_attachment.lambda_basic]
}


resource "aws_lambda_function_url" "web" {
  function_name      = aws_lambda_function.web.function_name
  authorization_type = "NONE"
  invoke_mode        = "BUFFERED"
  cors {
    allow_credentials = false
    allow_methods     = ["*"]
    allow_origins     = ["*"]
    allow_headers     = ["*"]
  }
}
