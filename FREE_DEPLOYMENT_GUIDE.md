# Complete Free Deployment Guide for Your Portfolio Website

## 🚀 Best Free Deployment Options

Since you have a full-stack application (React + FastAPI + MongoDB), here are the top free deployment strategies:

### **Option 1: Split Deployment (Recommended)**
- **Frontend**: Netlify or Vercel (Free)
- **Backend**: Railway or Render (Free tier)
- **Database**: MongoDB Atlas (Free tier)

### **Option 2: All-in-One Platform**
- **Full Stack**: Railway (Free tier - $5 credit monthly)
- **Database**: Built-in PostgreSQL or external MongoDB Atlas

---

## 🎯 RECOMMENDED: Split Deployment Strategy

This approach gives you the best performance and reliability for free.

---

## PART 1: Set Up Database (MongoDB Atlas - Free)

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click "Try Free"
3. Sign up with your email
4. Choose "Build a database"
5. Select **M0 Sandbox (FREE)**
6. Choose **AWS** as provider
7. Select region closest to you
8. Click "Create Cluster"

### Step 2: Configure Database Access
1. **Create Database User:**
   - Click "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `portfolio_user`
   - Password: Generate secure password (save it!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

2. **Configure Network Access:**
   - Click "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

### Step 3: Get Connection String
1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Python" and version "3.12 or later"
5. Copy the connection string
6. Replace `<password>` with your actual password
7. Replace `<dbname>` with `portfolio_db`

**Example connection string:**
```
mongodb+srv://portfolio_user:yourpassword@cluster0.xxxxx.mongodb.net/portfolio_db?retryWrites=true&w=majority
```

---

## PART 2: Prepare Your Code for GitHub

### Step 1: Create Project Structure
```bash
# Your project should look like this:
portfolio-website/
├── frontend/          # React app
├── backend/           # FastAPI app  
├── .gitignore
├── README.md
└── netlify.toml       # We'll create this
```

### Step 2: Update Backend for Production
Create `backend/requirements.txt`:
```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
motor==3.3.2
python-dotenv==1.0.0
pydantic==2.5.0
starlette==0.27.0
pymongo==4.6.0
```

Update `backend/server.py` to handle production environment:
```python
import os
from pathlib import Path

# Load environment variables
if os.path.exists('.env'):
    from dotenv import load_dotenv
    load_dotenv()

# MongoDB connection - use environment variable or default
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'portfolio_db')

client = AsyncIOMotorClient(mongo_url)
db = client[db_name]
```

### Step 3: Update Frontend for Production
Update `frontend/src/App.js` to handle different environments:
```javascript
// At the top of your App.js
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 
                   process.env.NODE_ENV === 'production' 
                   ? 'https://your-backend-app.railway.app'  // We'll update this later
                   : 'http://localhost:8001';
```

### Step 4: Create .gitignore
```gitignore
# Dependencies
node_modules/
__pycache__/
*.pyc

# Build outputs
build/
dist/

# Environment variables
.env
.env.local
.env.production

# Logs
*.log

# Database
*.db

# IDE
.vscode/
.idea/

# OS
.DS_Store
```

### Step 5: Push to GitHub
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Portfolio website ready for deployment"

# Create GitHub repository
# Go to GitHub.com and create a new repository named "portfolio-website"

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git
git branch -M main
git push -u origin main
```

---

## PART 3: Deploy Backend on Railway (Free)

### Step 1: Create Railway Account
1. Go to [Railway.app](https://railway.app)
2. Click "Login" and sign in with GitHub
3. Authorize Railway to access your repositories

### Step 2: Deploy Backend
1. Click "New Project"
2. Choose "Deploy from GitHub repo"
3. Select your `portfolio-website` repository
4. Railway will detect both frontend and backend - **select the backend**
5. Click "Deploy"

### Step 3: Configure Environment Variables
1. Go to your Railway project dashboard
2. Click on your backend service
3. Go to "Variables" tab
4. Add these environment variables:
   ```
   MONGO_URL=mongodb+srv://portfolio_user:yourpassword@cluster0.xxxxx.mongodb.net/portfolio_db?retryWrites=true&w=majority
   DB_NAME=portfolio_db
   PORT=8001
   ```

### Step 4: Configure Build Settings
1. In Railway, go to "Settings" tab
2. Set these configurations:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn server:app --host 0.0.0.0 --port $PORT`

### Step 5: Get Your Backend URL
1. Go to "Settings" tab in Railway
2. Scroll to "Domains"
3. Click "Generate Domain"
4. Copy the generated URL (e.g., `https://backend-production-xxxx.up.railway.app`)

---

## PART 4: Deploy Frontend on Netlify (Free)

### Step 1: Create Netlify Account
1. Go to [Netlify.com](https://netlify.com)
2. Click "Sign up" and sign in with GitHub

### Step 2: Create netlify.toml Configuration
Create `netlify.toml` in your project root:
```toml
[build]
  base = "frontend"
  command = "npm run build"
  publish = "build"

[build.environment]
  REACT_APP_BACKEND_URL = "https://your-backend-url.up.railway.app"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Step 3: Deploy Frontend
1. In Netlify dashboard, click "Add new site"
2. Choose "Import an existing project"
3. Select "Deploy with GitHub"
4. Choose your `portfolio-website` repository
5. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`
6. Add environment variable:
   - **Key**: `REACT_APP_BACKEND_URL`
   - **Value**: Your Railway backend URL
7. Click "Deploy site"

### Step 4: Get Your Frontend URL
1. After deployment, Netlify will provide a URL like:
   `https://amazing-name-123456.netlify.app`
2. You can customize this in Site settings

---

## PART 5: Alternative - Deploy Everything on Railway

If you prefer one platform for everything:

### Step 1: Create Railway Project
1. Go to Railway.app
2. Click "New Project"
3. Choose "Deploy from GitHub repo"

### Step 2: Deploy Both Services
1. Add your backend service (as above)
2. Click "Add Service" → "GitHub Repo"
3. Select your repository again for frontend
4. Configure frontend:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npx serve -s build -l $PORT`

### Step 3: Environment Variables
**Frontend service:**
```
REACT_APP_BACKEND_URL=https://your-backend-service.railway.app
```

**Backend service:**
```
MONGO_URL=your-mongodb-atlas-connection-string
DB_NAME=portfolio_db
```

---

## PART 6: Free Tier Limitations & Alternatives

### Railway Free Tier:
- $5 credit per month (usually covers small apps)
- Apps sleep after 6 hours of inactivity
- 500 hours of usage per month

### Netlify Free Tier:
- 100GB bandwidth per month
- 300 build minutes per month
- Perfect for frontend hosting

### Alternative Platforms:

#### **Render (Another great free option):**
1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Similar deployment process to Railway
4. Free tier: 750 hours per month

#### **Vercel (Great for frontend):**
1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Automatic deployment from GitHub
4. Perfect for React apps

---

## PART 7: Complete Deployment Commands

### Quick Setup Script:
```bash
#!/bin/bash
# Run this script to prepare your project for deployment

# 1. Update backend requirements
echo "fastapi==0.104.1
uvicorn[standard]==0.24.0
motor==3.3.2
python-dotenv==1.0.0
pydantic==2.5.0
starlette==0.27.0
pymongo==4.6.0" > backend/requirements.txt

# 2. Create netlify.toml
echo '[build]
  base = "frontend"
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200' > netlify.toml

# 3. Add and commit changes
git add .
git commit -m "Prepare for deployment"
git push
```

---

## PART 8: Custom Domain (Optional)

### For Netlify:
1. Buy domain from any registrar
2. In Netlify: Go to Site settings → Domain management
3. Add custom domain
4. Update DNS records at your registrar

### For Railway:
1. In Railway: Go to Settings → Domains
2. Add custom domain
3. Update DNS records

---

## PART 9: Monitoring Your Free Apps

### Keep Apps Awake:
Since free tiers often "sleep" apps, you can use:

1. **UptimeRobot** (free):
   - Sign up at uptimerobot.com
   - Add your backend URL
   - Set ping interval to 5 minutes
   - Keeps your app awake

2. **Cron Jobs**:
   ```bash
   # Add to your local cron or use GitHub Actions
   */5 * * * * curl https://your-backend-url.railway.app/api/health
   ```

---

## PART 10: Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Add your Netlify domain to backend CORS origins
   ```python
   app.add_middleware(
       CORSMiddleware,
       allow_origins=[
           "https://your-site.netlify.app",
           "http://localhost:3000"
       ],
   )
   ```

2. **Build Failures**:
   - Check build logs in platform dashboard
   - Ensure all dependencies are in requirements.txt/package.json

3. **Database Connection Issues**:
   - Verify MongoDB Atlas connection string
   - Check if IP whitelist includes 0.0.0.0/0

4. **Environment Variables**:
   - Double-check all environment variables are set correctly
   - Restart services after updating variables

---

## 💡 Quick Start Summary

1. **Database**: MongoDB Atlas (free) ✅
2. **Backend**: Railway.app (free $5 credit) ✅
3. **Frontend**: Netlify (free) ✅
4. **Domain**: Optional custom domain
5. **Total Cost**: $0/month ✅

**Expected URLs:**
- Frontend: `https://your-portfolio.netlify.app`
- Backend: `https://your-backend.up.railway.app`
- Database: MongoDB Atlas cluster

This setup gives you a professional, fast, and completely free portfolio website! 🚀

Let me know if you need help with any specific step!