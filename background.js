// Background script for TriggerIncident Chrome Extension

// Install event - runs when extension is first installed
chrome.runtime.onInstalled.addListener((details) => {
    console.log('TriggerIncident extension installed');
    
    // Set default settings if this is a fresh install
    if (details.reason === 'install') {
        chrome.storage.sync.set({
            triggerIncidentSettings: {
                autoSaveRouting: true,
                showNotifications: true,
                confirmBeforeTrigger: false,
                defaultCategory: 'AWS:Reinvent'
            }
        });
    }
});

// Handle extension icon click (optional - popup will handle most interactions)
chrome.action.onClicked.addListener((tab) => {
    // This won't fire if popup is defined in manifest, but keeping for completeness
    console.log('Extension icon clicked');
});

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Background received message:', request);
    
    switch (request.action) {
        case 'triggerEvent':
            handleTriggerEvent(request.payload, sendResponse);
            return true; // Keep message channel open for async response
            
        case 'getSettings':
            handleGetSettings(sendResponse);
            return true;
            
        case 'saveSettings':
            handleSaveSettings(request.settings, sendResponse);
            return true;
            
        default:
            console.log('Unknown action:', request.action);
            sendResponse({ success: false, error: 'Unknown action' });
    }
});

// Handle triggering a single event
async function handleTriggerEvent(payload, sendResponse) {
    try {
        const response = await fetch('https://events.pagerduty.com/v2/enqueue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        if (response.ok) {
            const result = await response.json();
            sendResponse({ success: true, data: result });
        } else {
            const errorText = await response.text();
            sendResponse({ success: false, error: errorText });
        }
    } catch (error) {
        sendResponse({ success: false, error: error.message });
    }
}

// Handle getting settings
async function handleGetSettings(sendResponse) {
    try {
        const result = await chrome.storage.sync.get(['triggerIncidentSettings', 'routingKey']);
        sendResponse({ success: true, data: result });
    } catch (error) {
        sendResponse({ success: false, error: error.message });
    }
}

// Handle saving settings
async function handleSaveSettings(settings, sendResponse) {
    try {
        await chrome.storage.sync.set({ triggerIncidentSettings: settings });
        sendResponse({ success: true });
    } catch (error) {
        sendResponse({ success: false, error: error.message });
    }
}

// Handle storage changes (optional - for syncing between multiple instances)
chrome.storage.onChanged.addListener((changes, namespace) => {
    console.log('Storage changed:', changes, 'in namespace:', namespace);
    
    // Notify any open popups about setting changes
    chrome.runtime.sendMessage({
        action: 'settingsChanged',
        changes: changes
    }).catch(() => {
        // Ignore errors if no popup is open
    });
});

// Cleanup on extension unload
chrome.runtime.onSuspend.addListener(() => {
    console.log('TriggerIncident extension suspending');
});