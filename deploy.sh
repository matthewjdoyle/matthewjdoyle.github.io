#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful! Deploying to GitHub Pages..."
    
    # Create a temporary branch for deployment
    git checkout -b gh-pages-temp
    
    # Remove everything except dist folder
    git rm -rf .
    git reset HEAD .
    
    # Copy dist contents to root
    cp -r dist/* .
    
    # Add all files
    git add .
    
    # Commit
    git commit -m "Deploy to GitHub Pages"
    
    # Push to gh-pages branch
    git push origin gh-pages-temp:gh-pages --force
    
    # Clean up
    git checkout main
    git branch -D gh-pages-temp
    
    echo "Deployment complete!"
else
    echo "Build failed! Please fix the errors and try again."
    exit 1
fi 