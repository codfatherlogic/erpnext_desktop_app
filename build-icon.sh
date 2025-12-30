#!/bin/bash

# Icon Builder for ERPNext Desktop
# Converts PNG to platform-specific icon formats

echo "Building icons from Images/erpnext.png..."

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "Installing ImageMagick..."
    if command -v brew &> /dev/null; then
        brew install imagemagick
    else
        echo "Please install ImageMagick: https://imagemagick.org/script/download.php"
        exit 1
    fi
fi

# Create build directory
mkdir -p build

# For macOS (.icns)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "Creating macOS icon (.icns)..."
    mkdir -p build/icon.iconset
    
    # Create different sizes for iconset
    sips -z 16 16     Images/erpnext.png --out build/icon.iconset/icon_16x16.png
    sips -z 32 32     Images/erpnext.png --out build/icon.iconset/icon_16x16@2x.png
    sips -z 32 32     Images/erpnext.png --out build/icon.iconset/icon_32x32.png
    sips -z 64 64     Images/erpnext.png --out build/icon.iconset/icon_32x32@2x.png
    sips -z 128 128   Images/erpnext.png --out build/icon.iconset/icon_128x128.png
    sips -z 256 256   Images/erpnext.png --out build/icon.iconset/icon_128x128@2x.png
    sips -z 256 256   Images/erpnext.png --out build/icon.iconset/icon_256x256.png
    sips -z 512 512   Images/erpnext.png --out build/icon.iconset/icon_256x256@2x.png
    sips -z 512 512   Images/erpnext.png --out build/icon.iconset/icon_512x512.png
    sips -z 1024 1024 Images/erpnext.png --out build/icon.iconset/icon_512x512@2x.png
    
    # Convert to .icns
    iconutil -c icns build/icon.iconset -o build/icon.icns
    
    echo "✓ macOS icon created: build/icon.icns"
fi

# For Windows (.ico)
echo "Creating Windows icon (.ico)..."
convert Images/erpnext.png -define icon:auto-resize=256,128,64,48,32,16 build/icon.ico
echo "✓ Windows icon created: build/icon.ico"

# For Linux (just copy PNG)
echo "Creating Linux icon (.png)..."
cp Images/erpnext.png build/icon.png
echo "✓ Linux icon created: build/icon.png"

echo ""
echo "✅ All icons created successfully!"
echo "Update your package.json to use build/icon.{icns,ico,png}"
