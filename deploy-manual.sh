#!/bin/bash

echo "🚀 Starting manual deployment..."

# Build the project
echo "📦 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"

# Create a backup of the current root index.html
echo "💾 Creating backup of current index.html..."
cp index.html index.html.backup

# Copy the built files to the root
echo "📁 Copying built files to root..."
cp -r dist/* .

# Add .nojekyll file to root
echo "" > .nojekyll

echo "✅ Files copied successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Commit and push the changes:"
echo "   git add ."
echo "   git commit -m 'Deploy built files to root'"
echo "   git push origin main"
echo ""
echo "2. Go to your repository Settings > Pages"
echo "3. Make sure 'Deploy from a branch' is selected"
echo "4. Select 'main' branch and '/ (root)' folder"
echo "5. Click Save"
echo ""
echo "🌐 Your site should be available in a few minutes!" 