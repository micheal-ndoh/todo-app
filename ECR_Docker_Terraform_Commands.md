# AWS ECR & Docker Useful Commands

## ECR Image Management

### List images in ECR
```
aws ecr list-images --repository-name todo-app --region eu-central-1
```

### Describe images (get more details)
```
aws ecr describe-images --repository-name todo-app --region eu-central-1
```

### Delete a specific image by digest
```
aws ecr batch-delete-image --repository-name todo-app --region eu-central-1 --image-ids imageDigest=IMAGE_DIGEST
```

### Delete all images in a repository
```
aws ecr list-images --repository-name todo-app --region eu-central-1 --query 'imageIds[*]' --output json | \
  aws ecr batch-delete-image --repository-name todo-app --region eu-central-1 --image-ids file:///dev/stdin
```

## Docker Commands

### Build Docker image
```
docker build --platform linux/amd64 -t your-app-name:latest .
```

### Run Docker image locally
```
docker run -p 3000:3000 your-app-name:latest
```

### List local Docker images
```
docker images
```

### Remove a local Docker image
```
docker rmi IMAGE_ID
```

## ECR Authentication & Push

### Login to ECR
```
aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 571075516563.dkr.ecr.eu-central-1.amazonaws.com/todo-app
```

### Tag and push Docker image to ECR
```
docker tag your-app-name:latest 571075516563.dkr.ecr.eu-central-1.amazonaws.com/todo-app:latest
docker push 571075516563.dkr.ecr.eu-central-1.amazonaws.com/todo-app:latest
```

## Terraform Commands

### Initialize Terraform
```
terraform init
```

### Apply Terraform changes
```
terraform apply
```

### Destroy all Terraform-managed resources
```
terraform destroy
```

---

> **Note:** Replace `IMAGE_DIGEST` and `IMAGE_ID` with actual values from your image listings.
