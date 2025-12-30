#!/bin/bash

# ERPNext Desktop Build Script
# Builds for all platforms: macOS (Intel & Silicon), Windows, Linux

echo "🚀 ERPNext Desktop - Multi-Platform Build"
echo "=========================================="
echo ""

# Check if in correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this script from the project root."
    exit 1
fi

# Function to build
build_platform() {
    local platform=$1
    local name=$2
    
    echo "📦 Building for $name..."
    npm run build:$platform
    
    if [ $? -eq 0 ]; then
        echo "✅ $name build complete!"
    else
        echo "❌ $name build failed!"
        return 1
    fi
    echo ""
}

# Parse arguments
if [ "$1" = "mac-intel" ]; then
    build_platform "mac-intel" "macOS Intel (x64)"
elif [ "$1" = "mac-silicon" ]; then
    build_platform "mac-silicon" "macOS Apple Silicon (arm64)"
elif [ "$1" = "mac" ]; then
    echo "Building macOS Universal (Intel + Silicon)..."
    build_platform "mac-universal" "macOS Universal"
elif [ "$1" = "win" ]; then
    build_platform "win" "Windows (x64 + x86)"
elif [ "$1" = "linux" ]; then
    build_platform "linux" "Linux (x64 + arm64)"
elif [ "$1" = "all" ]; then
    echo "Building for ALL platforms..."
    echo ""
    
    build_platform "mac-intel" "macOS Intel"
    build_platform "mac-silicon" "macOS Silicon"
    build_platform "win" "Windows"
    build_platform "linux" "Linux"
    
    echo "=========================================="
    echo "✅ All builds complete!"
    echo ""
    echo "📁 Installers are in the 'dist' folder:"
    ls -lh dist/
else
    echo "Usage: ./build-app.sh [platform]"
    echo ""
    echo "Platforms:"
    echo "  mac-intel    - macOS Intel (x64)"
    echo "  mac-silicon  - macOS Apple Silicon (arm64)"
    echo "  mac          - macOS Universal (Intel + Silicon)"
    echo "  win          - Windows (x64 + x86)"
    echo "  linux        - Linux (x64 + arm64)"
    echo "  all          - Build for all platforms"
    echo ""
    echo "Examples:"
    echo "  ./build-app.sh mac-intel"
    echo "  ./build-app.sh all"
    echo ""
    echo "Or use npm scripts directly:"
    echo "  npm run build:mac-intel"
    echo "  npm run build:mac-silicon"
    echo "  npm run build:mac-universal"
    echo "  npm run build:win"
    echo "  npm run build:linux"
    exit 1
fi

echo ""
echo "✅ Build process completed!"
echo "📁 Find your installers in: dist/"
echo ""
echo "File list:"
ls -lh dist/ | grep -E '\.(dmg|exe|AppImage|deb|zip)$'
