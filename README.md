# 🚀 CI/CD Pipeline for Frontend Deployment on AWS

This project sets up a robust and automated CI/CD pipeline for deploying a frontend application to AWS using **ECS Fargate**, **ECR**, **CodeBuild**, **CodePipeline**, and an **Application Load Balancer** (ALB).

## 📋 Workflow Steps

1. **Create an AWS CLI User**
   - Assign appropriate IAM permissions (AdminAccess, ECR, ECS, S3, CodePipeline, CodeBuild).
2. **Create an Amazon ECR Repository**
   - Used to store Docker images.

3. **Set Up Security Groups**
   - `alb_sg`: Inbound rule allows **HTTP (port 80)** from **0.0.0.0/0** (anywhere).
   - `alb_to_ecs`: Inbound rule allows **TCP on your exposed port** (e.g., 3000) from the **`alb_sg` security group**.

4. **Create an ECS Cluster (Fargate)**
   - Launch type: `FARGATE`.

5. **Define ECS Task Definition**
   - Connect the container image from ECR.
   - Define the container port.

6. **Create ECS Service and Load Balancer**
   - Use `alb_to_ecs` as the service security group.
   - Create a **new ALB (Application Load Balancer)**.
   - Create a **Target Group** and connect it to the ALB.

7. **Modify ALB Security Group**
   - Replace the ALB’s security group with `alb_sg` to allow internet access.

8. **Create or Update `buildspec.yml`**
   - Contains Docker build and push instructions to ECR.
   - Generates `imagedefinitions.json` used by ECS.

9. **Create AWS CodeBuild Project**
   - Connect it to your **GitHub repo**.
   - Reference your `buildspec.yml`.

10. **Assign IAM Permissions to CodeBuild**
    - Include: `AmazonS3FullAccess`, `AmazonECS_FullAccess`, `CloudWatchFullAccess`, `AdministratorAccess`, `AmazonEC2ContainerRegistryFullAccess`.

11. **Create AWS CodePipeline**
    - Set up 3 stages: **Source** (GitHub), **Build** (CodeBuild), **Deploy** (ECS).

12. **Set Environment Variables**
    - Required by `buildspec.yml`:  
      - `AWS_ACCOUNT_ID`
      - `AWS_DEFAULT_REGION`
      - `IMAGE_REPO_NAME`
      - `IMAGE_TAG`
      - `CONTAINER_NAME`
      - `REPOSITORY_URI`

---

## 🛠 Technologies

- **AWS ECS Fargate**
- **Amazon ECR**
- **AWS CodePipeline**
- **AWS CodeBuild**
- **GitHub**
- **Docker**

## ✅ Benefits

- Fully automated pipeline from GitHub to AWS ECS.
- Scalable and secure deployment using ALB.
- Easily extendable with test or staging environments.


## 📸 Screenshots

_Add deployment UI screenshots here (optional)_

---

Made with ❤️ by SEBEOGO Landry Yves Joel
