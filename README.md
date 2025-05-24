# TriggerIncident - PagerDuty Event Generator Chrome Extension

A powerful Chrome extension for generating and triggering PagerDuty events with customizable payloads and advanced timing controls.

## Features

### 🚀 Core Functionality
- **Multiple Event Categories**: Pre-configured event templates for AWS, Datadog, New Relic, Prometheus, SolarWinds, CrowdStrike, and Customer Sentiment
- **Custom JSON Editing**: Edit event payloads with a built-in JSON editor
- **Bulk Operations**: Select all or clear all events with one click
- **Progress Tracking**: Real-time progress monitoring for multiple event triggers

### ⏱️ Advanced Timing Controls
- **Random Delays**: Add random delays between event triggers (1-60 seconds)
- **Configurable Timing**: Set minimum and maximum delay ranges
- **Realistic Simulation**: Simulate real-world incident scenarios with varied timing

### 🎨 Modern UI/UX
- **Dark Theme**: Beautiful dark theme with gradient backgrounds and neon accents
- **Responsive Design**: Optimized for Chrome extension popup dimensions
- **Smooth Animations**: Polished animations and transitions
- **Toast Notifications**: Real-time feedback for all operations

### ⚙️ Settings & Configuration
- **Auto-save Routing Key**: Automatically save your PagerDuty routing key
- **Notification Controls**: Toggle success notifications on/off
- **Confirmation Prompts**: Optional confirmation before triggering events
- **Default Category**: Set your preferred starting category

## Installation

### Method 1: Load Unpacked Extension (Development)

1. **Download or Clone** this repository to your local machine
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable Developer Mode** by toggling the switch in the top-right corner
4. **Click "Load unpacked"** and select the extension directory
5. **Pin the extension** to your toolbar for easy access

**Note**: The extension will work without custom icons. Chrome will use default icons if none are provided.

### Method 2: Chrome Web Store (Coming Soon)
The extension will be available on the Chrome Web Store once published.

## Setup

### 1. Get Your PagerDuty Routing Key
1. Log into your PagerDuty account
2. Go to **Services** → Select your service → **Integrations**
3. Add a new **Events API v2** integration
4. Copy the **Integration Key** (this is your routing key)

### 2. Configure the Extension
1. Click the TriggerIncident extension icon
2. Enter your routing key in the configuration section
3. Optionally enable random delays between events
4. Access settings via the gear icon for additional options

## Usage

### Basic Event Triggering
1. **Select Category**: Choose from the available categories (AWS, Datadog, etc.)
2. **Choose Events**: Check the events you want to trigger
3. **Configure Delays** (Optional): Enable random delays and set min/max values
4. **Trigger Events**: Click the "Trigger Events" button

### Advanced Features

#### Custom JSON Editing
- Click the **edit icon** on any event card
- Modify the JSON payload as needed
- Use the **Reset** button to restore original payload
- **Save Changes** to apply your modifications

#### Random Delay Configuration
- Enable the **"Random delay between events"** checkbox
- Set **minimum delay** (1-60 seconds)
- Set **maximum delay** (1-60 seconds)
- Each event will be delayed by a random amount within your range

#### Bulk Operations
- **Select All**: Choose all visible events at once
- **Clear All**: Deselect all events
- **Selection Counter**: See how many events are selected

### Event Categories

#### 🌐 Alert Storm
Shows all events from all categories - perfect for testing multiple scenarios

#### ♦️ AWS:Reinvent
- Database upgrade failures
- Lambda function timeouts
- AWS-specific infrastructure issues

#### 🐶 Datadog
- High CPU usage alerts
- Memory leak detection
- Performance monitoring events

#### 🔍 New Relic
- Slow transaction alerts
- Error rate spikes
- Application performance issues

#### 🔥 Prometheus
- High API latency
- Disk space warnings
- Infrastructure capacity alerts

#### ☀️ SolarWinds
- Network outages
- Bandwidth saturation
- Network infrastructure issues

#### 🦅 CrowdStrike
- Malware detection
- Suspicious activity alerts
- Security threat notifications

#### 😊 Customer Sentiment
- Negative feedback spikes
- Customer churn risk alerts
- Customer experience issues

## Settings

Access the settings panel via the gear icon in the header:

- **Auto-save routing key**: Automatically save your routing key for future use
- **Show success notifications**: Display toast notifications for successful triggers
- **Confirm before triggering events**: Show confirmation dialog before sending events
- **Default category**: Set which category loads by default

## Technical Details

### Architecture
- **Manifest V3**: Built using the latest Chrome extension standards
- **Modern JavaScript**: ES6+ features with async/await
- **Chrome Storage API**: Secure storage for settings and routing keys
- **PagerDuty Events API v2**: Direct integration with PagerDuty's event system

### File Structure
```
├── manifest.json          # Extension configuration
├── popup.html             # Main UI structure
├── popup.css              # Styling and theme
├── popup.js               # Core functionality
├── background.js          # Background service worker
├── icons/                 # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md              # This file
```

### Permissions
- **storage**: For saving settings and routing keys
- **activeTab**: For accessing the current tab (minimal permission)
- **host_permissions**: For making requests to PagerDuty's API

## Development

### Prerequisites
- Chrome browser (latest version recommended)
- Basic understanding of Chrome extensions
- PagerDuty account with Events API access

### Local Development
1. Clone this repository
2. Make your changes to the source files
3. Reload the extension in `chrome://extensions/`
4. Test your changes in the popup

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Troubleshooting

### Common Issues

#### "Please enter a routing key" Error
- Ensure you've entered a valid PagerDuty routing key
- Check that the routing key is from an Events API v2 integration

#### Events Not Triggering
- Verify your routing key is correct
- Check the browser console for error messages
- Ensure you have internet connectivity
- Verify the PagerDuty service is configured correctly

#### Extension Not Loading
- Check that Developer Mode is enabled
- Ensure all required files are present
- Look for errors in `chrome://extensions/`

#### JSON Editor Issues
- Ensure your JSON syntax is valid
- Use the Reset button to restore original payload
- Check for missing commas or brackets

### Support
For issues and feature requests, please create an issue in the repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Changelog

### Version 1.0.0
- Initial release
- Core event triggering functionality
- Random delay feature
- JSON payload editing
- Settings management
- Dark theme UI
- Multiple event categories
- Progress tracking
- Toast notifications

## Roadmap

### Upcoming Features
- Custom event templates
- Event scheduling
- Bulk import/export
- Integration with other monitoring tools
- Advanced filtering options
- Event history tracking
- Team collaboration features

---

**Made with ⚡ for the PagerDuty community**