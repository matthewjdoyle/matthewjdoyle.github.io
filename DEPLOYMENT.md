# Deployment Guide

This guide explains how to deploy your portfolio website to GitHub Pages.

## Prerequisites

- Your code is pushed to a GitHub repository
- You have admin access to the repository

## Option 1: Automatic Deployment (Recommended)

### Step 1: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "GitHub Actions"
5. Click "Save"

### Step 2: Push Your Changes
```bash
git add .
git commit -m "Add GitHub Actions deployment workflow"
git push origin main
```

### Step 3: Monitor Deployment
1. Go to the "Actions" tab in your repository
2. You should see a workflow running called "Deploy to GitHub Pages"
3. Wait for it to complete (usually takes 2-3 minutes)
4. Once complete, your site will be available at `https://yourusername.github.io/repository-name`

## Option 2: Manual Deployment

If automatic deployment doesn't work, you can deploy manually:

### Step 1: Build Locally
```bash
npm run build
```

### Step 2: Deploy to gh-pages Branch
```bash
# Install gh-pages if you haven't already
npm install --save-dev gh-pages

# Add this script to package.json
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

### Step 3: Configure GitHub Pages
1. Go to repository Settings > Pages
2. Under "Source", select "Deploy from a branch"
3. Select "gh-pages" branch and "/ (root)" folder
4. Click "Save"

## Troubleshooting

### Common Issues

1. **Build Fails**: Check the Actions tab for error messages
2. **Site Not Loading**: Ensure the correct branch is selected in Pages settings
3. **Styling Issues**: Make sure Tailwind CSS is building correctly

### Debug Steps

1. Check the build output in the Actions tab
2. Verify all dependencies are installed
3. Test the build locally with `npm run build`
4. Check the generated files in the `dist` folder

## Custom Domain

If you have a custom domain (like matthewd0yle.com):

1. Add your domain to the `CNAME` file in the repository root
2. Configure your DNS settings to point to GitHub Pages
3. Enable HTTPS in the Pages settings

## File Structure After Deployment

```
your-repo/
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions workflow
├── src/
│   ├── index.css           # Tailwind CSS
│   └── ...                 # React components
├── dist/                   # Built files (generated)
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## Support

If you encounter issues:
1. Check the GitHub Actions logs
2. Verify your Node.js and npm versions
3. Ensure all dependencies are properly installed
4. Test the build process locally first 