output "lambda_function_url" {
  description = "Public Function URL for the Lambda-hosted Next.js app"
  value       = aws_lambda_function_url.web.function_url
}

output "ecr_repository_url" {
  description = "ECR repository URL used for the Docker image"
  value       = aws_ecr_repository.main.repository_url
}
