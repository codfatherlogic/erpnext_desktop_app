#!/bin/bash

# GitHub Release Script
# Creates a release and uploads build artifacts

VERSION="v1.0.0"
REPO="codfatherlogic/erpnext_desktop_app"

# GITHUB_TOKEN should be set as environment variable
# export GITHUB_TOKEN=your_token_here

echo "🚀 Creating GitHub Release $VERSION"
echo "======================================"

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "Installing GitHub CLI..."
    brew install gh
fi

# Check if GITHUB_TOKEN is set
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Error: GITHUB_TOKEN environment variable not set"
    echo "Set it with: export GITHUB_TOKEN=your_token_here"
    exit 1
fi

# Authenticate with GitHub
echo "$GITHUB_TOKEN" | gh auth login --with-token

# Create release
echo "📝 Creating release..."
gh release create "$VERSION" \
  --repo "$REPO" \
  --title "ERPNext Desktop $VERSION" \
  --notes-file RELEASE_NOTES.md \
  dist/*.dmg \
  dist/*.zip \
  Images/erpnext.png

echo ""
echo "✅ Release created successfully!"
echo "🔗 View at: https://github.com/$REPO/releases/tag/$VERSION"
