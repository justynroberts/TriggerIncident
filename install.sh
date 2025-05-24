#!/bin/bash

# TriggerIncident Chrome Extension Installation Script

echo "🚀 TriggerIncident Chrome Extension Setup"
echo "========================================"

# Check if we're in the right directory
if [ ! -f "manifest.json" ]; then
    echo "❌ Error: manifest.json not found. Please run this script from the extension directory."
    exit 1
fi

echo "✅ Extension files found"

# Create icons directory if it doesn't exist
if [ ! -d "icons" ]; then
    mkdir -p icons
    echo "📁 Created icons directory"
fi

# Check for required files
required_files=("manifest.json" "popup.html" "popup.css" "popup.js" "background.js")
missing_files=()

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -ne 0 ]; then
    echo "❌ Missing required files:"
    printf '%s\n' "${missing_files[@]}"
    exit 1
fi

echo "✅ All required files present"

# Check for icon files
icon_files=("icons/icon16.png" "icons/icon32.png" "icons/icon48.png" "icons/icon128.png")
missing_icons=()

for icon in "${icon_files[@]}"; do
    if [ ! -f "$icon" ]; then
        missing_icons+=("$icon")
    fi
done

if [ ${#missing_icons[@]} -ne 0 ]; then
    echo "⚠️  Warning: Missing icon files (extension will still work):"
    printf '%s\n' "${missing_icons[@]}"
    echo "💡 You can add proper icon files later or use placeholder icons"
fi

echo ""
echo "🎉 Extension is ready for installation!"
echo ""
echo "📋 Installation Instructions:"
echo "1. Open Chrome and go to chrome://extensions/"
echo "2. Enable 'Developer mode' (toggle in top-right)"
echo "3. Click 'Load unpacked' button"
echo "4. Select this directory: $(pwd)"
echo "5. The extension will appear in your toolbar"
echo ""
echo "⚙️  Setup Instructions:"
echo "1. Click the TriggerIncident extension icon"
echo "2. Enter your PagerDuty routing key"
echo "3. Configure any desired settings"
echo "4. Start triggering events!"
echo ""
echo "📖 For detailed instructions, see README.md"
echo ""
echo "🔗 Need a PagerDuty routing key?"
echo "   Go to: PagerDuty → Services → Your Service → Integrations → Add Events API v2"