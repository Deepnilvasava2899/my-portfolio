# Complete Azure Deployment Guide for Your Portfolio Website

## Overview
This guide will walk you through deploying your React + FastAPI + MongoDB portfolio website to Microsoft Azure using Azure Static Web Apps for the frontend and Azure Container Instances for the backend.

## Prerequisites
- Azure account (free tier available)
- GitHub account
- Azure CLI installed on your local machine
- Git installed on your local machine

---

## PART 1: Prepare Your Code for GitHub

### Step 1: Initialize Git Repository (If not already done)
```bash
# Navigate to your project directory
cd /path/to/your/portfolio

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Portfolio website with React frontend and FastAPI backend"
```

### Step 2: Create .gitignore File
Create a `.gitignore` file in your project root:
```gitignore
# Dependencies
node_modules/
__pycache__/
*.pyc
*.pyo
*.pyd
.Python

# Build outputs
build/
dist/

# Environment variables
.env
*.env.local
*.env.production

# Logs
*.log
logs/

# Database
*.db
*.sqlite

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Azure
.azure/
```

### Step 3: Create Production Environment Files

#### Frontend Production Environment (.env.production)
```bash
# Create production environment file for frontend
cat > frontend/.env.production << EOF
REACT_APP_BACKEND_URL=https://your-backend-api.azurecontainer.io
EOF
```

#### Backend Production Requirements
Update your `backend/requirements.txt` to include all dependencies:
```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
motor==3.3.2
python-dotenv==1.0.0
pydantic==2.5.0
starlette==0.27.0
```

### Step 4: Create Dockerfile for Backend
Create `backend/Dockerfile`:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8001

# Run the application
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8001"]
```

### Step 5: Create GitHub Repository
1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Name it: `deepnil-portfolio`
4. Set it to Public (required for free Azure Static Web Apps)
5. Don't initialize with README (since you already have code)
6. Click "Create repository"

### Step 6: Push Code to GitHub
```bash
# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/deepnil-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## PART 2: Set Up Azure Services

### Step 1: Install Azure CLI
**Windows:**
```powershell
# Download and install from: https://aka.ms/installazurecliwindows
```

**macOS:**
```bash
brew install azure-cli
```

**Linux:**
```bash
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

### Step 2: Login to Azure
```bash
az login
```

### Step 3: Create Resource Group
```bash
# Create a resource group
az group create --name deepnil-portfolio-rg --location "East US"
```

---

## PART 3: Deploy MongoDB Database

### Option A: Azure Cosmos DB (Recommended for production)
```bash
# Create Cosmos DB account with MongoDB API
az cosmosdb create \
    --resource-group deepnil-portfolio-rg \
    --name deepnil-portfolio-db \
    --kind MongoDB \
    --server-version "4.2" \
    --default-consistency-level Eventual \
    --locations regionName="East US" failoverPriority=0 isZoneRedundant=False

# Create database
az cosmosdb mongodb database create \
    --account-name deepnil-portfolio-db \
    --resource-group deepnil-portfolio-rg \
    --name portfolio_db

# Get connection string
az cosmosdb keys list \
    --resource-group deepnil-portfolio-rg \
    --name deepnil-portfolio-db \
    --type connection-strings
```

### Option B: MongoDB Atlas (Alternative)
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create free cluster
3. Get connection string
4. Whitelist Azure IP ranges

---

## PART 4: Deploy Backend API

### Step 1: Create Container Registry
```bash
# Create Azure Container Registry
az acr create \
    --resource-group deepnil-portfolio-rg \
    --name deepnilportfolio \
    --sku Basic \
    --admin-enabled true
```

### Step 2: Build and Push Docker Image
```bash
# Login to registry
az acr login --name deepnilportfolio

# Build and push image
cd backend
az acr build --registry deepnilportfolio --image portfolio-backend:latest .
```

### Step 3: Deploy Container Instance
```bash
# Get ACR credentials
ACR_SERVER=$(az acr show --name deepnilportfolio --query loginServer --output tsv)
ACR_USERNAME=$(az acr credential show --name deepnilportfolio --query username --output tsv)
ACR_PASSWORD=$(az acr credential show --name deepnilportfolio --query passwords[0].value --output tsv)

# Create container instance
az container create \
    --resource-group deepnil-portfolio-rg \
    --name portfolio-backend \
    --image $ACR_SERVER/portfolio-backend:latest \
    --registry-login-server $ACR_SERVER \
    --registry-username $ACR_USERNAME \
    --registry-password $ACR_PASSWORD \
    --dns-name-label deepnil-portfolio-api \
    --ports 8001 \
    --environment-variables \
        MONGO_URL="your-mongodb-connection-string" \
        DB_NAME="portfolio_db" \
    --cpu 1 \
    --memory 1.5
```

### Step 4: Get Backend URL
```bash
# Get the FQDN of your backend
az container show \
    --resource-group deepnil-portfolio-rg \
    --name portfolio-backend \
    --query ipAddress.fqdn \
    --output tsv
```

---

## PART 5: Deploy Frontend with Azure Static Web Apps

### Step 1: Create Static Web App via Azure Portal
1. Go to [Azure Portal](https://portal.azure.com)
2. Click "Create a resource"
3. Search for "Static Web Apps"
4. Click "Create"

### Step 2: Configure Static Web App
**Basics Tab:**
- Subscription: Your Azure subscription
- Resource Group: `deepnil-portfolio-rg`
- Name: `deepnil-portfolio`
- Plan type: Free
- Region: East US 2

**Deployment Tab:**
- Source: GitHub
- GitHub account: Your account
- Organization: Your username
- Repository: `deepnil-portfolio`
- Branch: `main`
- Build presets: React
- App location: `/frontend`
- API location: (leave empty)
- Output location: `build`

### Step 3: Update Frontend Environment
Update `frontend/.env.production` with your actual backend URL:
```bash
REACT_APP_BACKEND_URL=https://deepnil-portfolio-api.eastus.azurecontainer.io
```

### Step 4: Configure Build Settings
Azure will automatically create `.github/workflows/azure-static-web-apps-xxx.yml` in your repository. Update it:

```yaml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

jobs:
  build_and_deploy_job:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
      - name: Build And Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN_XXX }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/frontend"
          api_location: ""
          output_location: "build"
        env:
          REACT_APP_BACKEND_URL: https://deepnil-portfolio-api.eastus.azurecontainer.io

  close_pull_request_job:
    if: github.event_name == 'pull_request' && github.event.action == 'closed'
    runs-on: ubuntu-latest
    name: Close Pull Request Job
    steps:
      - name: Close Pull Request
        id: closepullrequest
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN_XXX }}
          action: "close"
```

---

## PART 6: Configure Custom Domain (Optional)

### Step 1: Purchase Domain
Purchase a domain from any registrar (GoDaddy, Namecheap, etc.)

### Step 2: Add Custom Domain in Azure
1. Go to your Static Web App in Azure Portal
2. Click "Custom domains"
3. Click "Add"
4. Enter your domain name
5. Follow the DNS configuration instructions

### Step 3: Configure DNS
Add the following DNS records at your domain registrar:
- **CNAME Record**: `www` → `your-static-web-app.azurestaticapps.net`
- **A Record**: `@` → IP provided by Azure

---

## PART 7: Set Up SSL and Security

### Step 1: Enable HTTPS
Azure Static Web Apps automatically provides SSL certificates for custom domains.

### Step 2: Configure CORS
Your backend already has CORS configured, but you can make it more restrictive:

```python
# In your backend/server.py
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[
        "https://your-domain.com",
        "https://your-static-web-app.azurestaticapps.net"
    ],
    allow_methods=["GET", "POST", "PATCH"],
    allow_headers=["*"],
)
```

---

## PART 8: Monitoring and Maintenance

### Step 1: Set Up Application Insights
```bash
# Create Application Insights
az monitor app-insights component create \
    --app deepnil-portfolio-insights \
    --location eastus \
    --resource-group deepnil-portfolio-rg
```

### Step 2: Configure Monitoring
Add Application Insights to your backend:
```python
# Add to requirements.txt
# opencensus-ext-azure
# opencensus-ext-flask

# Add to your backend/server.py
from opencensus.ext.azure.log_exporter import AzureLogHandler
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
logger.addHandler(AzureLogHandler(connection_string="your-app-insights-connection-string"))
```

### Step 3: Set Up Alerts
1. Go to Azure Portal
2. Navigate to your Container Instance
3. Click "Alerts"
4. Create alerts for:
   - High CPU usage
   - Memory usage
   - HTTP errors

---

## PART 9: Estimated Costs

### Free Tier Options:
- **Azure Static Web Apps**: Free (100 GB bandwidth/month)
- **Azure Container Instances**: ~$0.0025/hour (~$1.80/month for basic setup)
- **Azure Cosmos DB**: 1000 RU/s free tier
- **Total estimated cost**: ~$2-5/month

### Scaling Options:
- Upgrade to Standard Static Web Apps for custom domains: ~$9/month
- Scale Container Instances for better performance: ~$15-30/month
- Premium Cosmos DB: ~$25+/month

---

## PART 10: Deployment Commands Summary

Here's a quick reference of all commands:

```bash
# 1. Login to Azure
az login

# 2. Create resource group
az group create --name deepnil-portfolio-rg --location "East US"

# 3. Create container registry
az acr create --resource-group deepnil-portfolio-rg --name deepnilportfolio --sku Basic --admin-enabled true

# 4. Build and push backend
az acr login --name deepnilportfolio
cd backend
az acr build --registry deepnilportfolio --image portfolio-backend:latest .

# 5. Deploy container instance
az container create \
    --resource-group deepnil-portfolio-rg \
    --name portfolio-backend \
    --image deepnilportfolio.azurecr.io/portfolio-backend:latest \
    --registry-login-server deepnilportfolio.azurecr.io \
    --registry-username $(az acr credential show --name deepnilportfolio --query username --output tsv) \
    --registry-password $(az acr credential show --name deepnilportfolio --query passwords[0].value --output tsv) \
    --dns-name-label deepnil-portfolio-api \
    --ports 8001 \
    --environment-variables MONGO_URL="your-connection-string" DB_NAME="portfolio_db" \
    --cpu 1 --memory 1.5

# 6. Create Static Web App through Azure Portal
# (Follow the portal steps above)
```

---

## Troubleshooting Tips

### Common Issues:
1. **CORS errors**: Check your backend CORS configuration
2. **API not accessible**: Verify container instance is running
3. **Build failures**: Check GitHub Actions logs
4. **Database connection**: Verify MongoDB connection string

### Useful Commands:
```bash
# Check container logs
az container logs --resource-group deepnil-portfolio-rg --name portfolio-backend

# Restart container
az container restart --resource-group deepnil-portfolio-rg --name portfolio-backend

# Check static web app status
az staticwebapp show --name deepnil-portfolio --resource-group deepnil-portfolio-rg
```

This comprehensive guide should get your portfolio website fully deployed on Azure! Let me know if you need clarification on any step.