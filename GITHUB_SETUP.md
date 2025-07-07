# GitHub Setup Guide for Rain Esports Website

Since Replit's GitHub integration isn't working, here are two simple alternatives:

## Method 1: GitHub CLI (Recommended)

If GitHub CLI is available in your Replit terminal:

```bash
# Install GitHub CLI (if not available)
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update && sudo apt install gh

# Login to GitHub
gh auth login

# Create and push repository
gh repo create rain-esports-website --public --description "Professional esports team website with admin panel and Discord integration"
git remote add origin https://github.com/YOUR_USERNAME/rain-esports-website.git
git add .
git commit -m "Initial commit: Rain Esports website with admin panel"
git push -u origin main
```

## Method 2: Manual GitHub Setup

1. **Go to GitHub.com and create a new repository:**
   - Repository name: `rain-esports-website`
   - Description: `Professional esports team website with admin panel and Discord integration`
   - Public repository
   - Don't initialize with README

2. **Copy the repository URL** (should look like: `https://github.com/USERNAME/rain-esports-website.git`)

3. **In Replit terminal, run these commands:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/rain-esports-website.git
   git add .
   git commit -m "Initial commit: Rain Esports website with admin panel"
   git push -u origin main
   ```

## Method 3: Download and Upload

If git commands don't work:

1. **Download your project:**
   - In Replit, click the 3 dots menu
   - Select "Download as ZIP"

2. **Create GitHub repository manually:**
   - Go to GitHub.com
   - Create new repository: `rain-esports-website`
   - Upload all files via web interface

## What will be uploaded:

- Complete Rain Esports website
- Admin panel (password: Rain2025)
- Discord integration with automatic member detection
- Global announcement system
- Professional README.md with full documentation
- All React components, Express.js backend, and database schema
- Proper .gitignore file

## Repository Features:

- Professional documentation
- Setup instructions for deployment
- API endpoint documentation
- Feature descriptions
- Tech stack overview
- Contributing guidelines

Your repository will be ready for deployment on platforms like Vercel, Netlify, or Railway.