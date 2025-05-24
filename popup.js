// Event payload data
const payloads = {
    "Datadog": [
        { 
            title: "High CPU Usage", 
            description: "CPU usage exceeds 90%", 
            category: "Datadog",
            payload: { 
                "payload": {
                    "summary": "High CPU usage detected on web-server-1",
                    "timestamp": "2023-07-24T14:07:00Z",
                    "severity": "critical",
                    "source": "web-server-1",
                    "component": "CPU",
                    "group": "backend",
                    "class": "performance",
                    "custom_details": {
                        "cpu_percent": "95.2%",
                        "environment": "production",
                        "team": "backend"
                    }
                },
                "routing_key": "DYNAMIC",
                "dedup_key": "web-server-1/cpu",
                "event_action": "trigger",
                "client": "Datadog",
                "client_url": "https://www.datadoghq.com",
                "links": [],
                "images": []
            }
        },
        { 
            title: "Memory Leak", 
            description: "Memory usage steadily increasing", 
            category: "Datadog",
            payload: { 
                "payload": {
                    "summary": "Potential memory leak detected on app-server-2",
                    "timestamp": "2023-07-24T14:15:00Z",
                    "severity": "warning",
                    "source": "app-server-2",
                    "component": "Memory",
                    "group": "backend",
                    "class": "performance",
                    "custom_details": {
                        "memory_percent": "80.5%",
                        "environment": "staging",
                        "team": "backend"
                    }
                },
                "routing_key": "DYNAMIC",
                "dedup_key": "app-server-2/memory",
                "event_action": "trigger",
                "client": "Datadog",
                "client_url": "https://www.datadoghq.com",
                "links": [],
                "images": []
            }
        }
    ],
    "New Relic": [
        { 
            title: "Slow Transaction", 
            description: "Transaction response time > 5s", 
            category: "New Relic",
            payload: { 
                "payload": {
                    "summary": "Slow transaction detected in checkout-service",
                    "timestamp": "2023-07-24T14:20:00Z",
                    "severity": "warning",
                    "source": "checkout-service",
                    "component": "Transaction",
                    "group": "frontend",
                    "class": "performance",
                    "custom_details": {
                        "transaction_time_ms": "5100",
                        "environment": "production",
                        "team": "frontend"
                    }
                },
                "routing_key": "DYNAMIC",
                "dedup_key": "checkout-service/transaction",
                "event_action": "trigger",
                "client": "New Relic",
                "client_url": "https://www.newrelic.com",
                "links": [],
                "images": []
            }
        },
        { 
            title: "Error Rate Spike", 
            description: "Error rate increased by 200%", 
            category: "New Relic",
            payload: { 
                "payload": {
                    "summary": "Error rate spike detected in user-service",
                    "timestamp": "2023-07-24T14:25:00Z",
                    "severity": "critical",
                    "source": "user-service",
                    "component": "API",
                    "group": "backend",
                    "class": "performance",
                    "custom_details": {
                        "error_rate": "0.05",
                        "environment": "production",
                        "team": "api"
                    }
                },
                "routing_key": "DYNAMIC",
                "dedup_key": "user-service/error-rate",
                "event_action": "trigger",
                "client": "New Relic",
                "client_url": "https://www.newrelic.com",
                "links": [],
                "images": []
            }
        }
    ],
    "Prometheus": [
        { 
            title: "High Latency", 
            description: "API latency exceeds SLA", 
            category: "Prometheus",
            payload: { 
                "payload": {
                    "summary": "High API latency detected on /v1/orders",
                    "timestamp": "2023-07-24T14:30:00Z",
                    "severity": "critical",
                    "source": "/v1/orders",
                    "component": "API",
                    "group": "backend",
                    "class": "performance",
                    "custom_details": {
                        "latency_ms": "1200",
                        "environment": "production",
                        "team": "api"
                    }
                },
                "routing_key": "DYNAMIC",
                "dedup_key": "/v1/orders/latency",
                "event_action": "trigger",
                "client": "Prometheus",
                "client_url": "https://prometheus.io",
                "links": [],
                "images": []
            }
        },
        { 
            title: "Disk Space Low", 
            description: "Disk usage above 85%", 
            category: "Prometheus",
            payload: { 
                "payload": {
                    "summary": "Low disk space on db-server-3",
                    "timestamp": "2023-07-24T14:35:00Z",
                    "severity": "warning",
                    "source": "db-server-3",
                    "component": "Disk",
                    "group": "infrastructure",
                    "class": "capacity",
                    "custom_details": {
                        "disk_percent": "87.3%",
                        "environment": "production",
                        "team": "infrastructure"
                    }
                },
                "routing_key": "DYNAMIC",
                "dedup_key": "db-server-3/disk",
                "event_action": "trigger",
                "client": "Prometheus",
                "client_url": "https://prometheus.io",
                "links": [],
                "images": []
            }
        }
    ]
};
// Continue with more payload data
const morePayloads = {
    "SolarWinds": [
        { 
            title: "Network Outage", 
            description: "Network switch down", 
            category: "SolarWinds",
            payload: { 
                "payload": {
                    "summary": "Network switch outage detected at datacenter-1",
                    "timestamp": "2023-07-24T14:40:00Z",
                    "severity": "critical",
                    "source": "switch-5",
                    "component": "Network",
                    "group": "network",
                    "class": "outage",
                    "custom_details": {
                        "device": "switch-5",
                        "location": "datacenter-1",
                        "environment": "datacenter",
                        "team": "network"
                    }
                },
                "routing_key": "DYNAMIC",
                "dedup_key": "switch-5/outage",
                "event_action": "trigger",
                "client": "SolarWinds",
                "client_url": "https://www.solarwinds.com",
                "links": [],
                "images": []
            }
        },
        { 
            title: "Bandwidth Saturation", 
            description: "Network bandwidth at 95%", 
            category: "SolarWinds",
            payload: { 
                "payload": {
                    "summary": "High bandwidth usage detected on router-3",
                    "timestamp": "2023-07-24T14:45:00Z",
                    "severity": "warning",
                    "source": "router-3",
                    "component": "Network",
                    "group": "network",
                    "class": "capacity",
                    "custom_details": {
                        "bandwidth_percent": "95.5%",
                        "environment": "datacenter",
                        "team": "network"
                    }
                },
                "routing_key": "DYNAMIC",
                "dedup_key": "router-3/bandwidth",
                "event_action": "trigger",
                "client": "SolarWinds",
                "client_url": "https://www.solarwinds.com",
                "links": [],
                "images": []
            }
        }
    ],
    "CrowdStrike": [
        { 
            title: "Malware Detected", 
            description: "Malware found on endpoint", 
            category: "CrowdStrike",
            payload: { 
                "payload": {
                    "summary": "Malware detected on laptop-4",
                    "timestamp": "2023-07-24T14:50:00Z",
                    "severity": "critical",
                    "source": "laptop-4",
                    "component": "Endpoint",
                    "group": "security",
                    "class": "threat",
                    "custom_details": {
                        "malware_name": "Trojan.Generic",
                        "environment": "corporate",
                        "team": "security"
                    }
                },
                "routing_key": "DYNAMIC",
                "dedup_key": "laptop-4/malware",
                "event_action": "trigger",
                "client": "CrowdStrike",
                "client_url": "https://www.crowdstrike.com",
                "links": [],
                "images": []
            }
        },
        { 
            title: "Suspicious Activity", 
            description: "Unusual process behavior detected", 
            category: "CrowdStrike",
            payload: { 
                "payload": {
                    "summary": "Suspicious process activity on desktop-7",
                    "timestamp": "2023-07-24T14:55:00Z",
                    "severity": "warning",
                    "source": "desktop-7",
                    "component": "Endpoint",
                    "group": "security",
                    "class": "threat",
                    "custom_details": {
                        "process_name": "unknown.exe",
                        "environment": "corporate",
                        "team": "security"
                    }
                },
                "routing_key": "DYNAMIC",
                "dedup_key": "desktop-7/suspicious",
                "event_action": "trigger",
                "client": "CrowdStrike",
                "client_url": "https://www.crowdstrike.com",
                "links": [],
                "images": []
            }
        }
    ],
    "Customer Sentiment": [
        { 
            title: "Negative Feedback Spike", 
            description: "Sudden increase in negative reviews", 
            category: "Customer Sentiment",
            payload: { 
                "payload": {
                    "summary": "Spike in negative customer feedback on web",
                    "timestamp": "2023-07-24T15:00:00Z",
                    "severity": "critical",
                    "source": "web",
                    "component": "Feedback",
                    "group": "support",
                    "class": "customer",
                    "custom_details": {
                        "negative_feedback_percent": "80.1%",
                        "environment": "production",
                        "team": "support"
                    }
                },
                "routing_key": "DYNAMIC",
                "dedup_key": "web/feedback",
                "event_action": "trigger",
                "client": "Sentiment Analysis",
                "client_url": "https://example.com",
                "links": [],
                "images": []
            }
        },
        { 
            title: "Customer Churn Risk", 
            description: "High-value customer showing churn signals", 
            category: "Customer Sentiment",
            payload: { 
                "payload": {
                    "summary": "Customer at risk of churning",
                    "timestamp": "2023-07-24T15:05:00Z",
                    "severity": "warning",
                    "source": "Sentiment Analysis",
                    "component": "Customer",
                    "group": "marketing",
                    "class": "risk",
                    "custom_details": {
                        "churn_score": "0.85",
                        "environment": "production",
                        "team": "marketing",
                        "customer_id": "12345"
                    }
                },
                "routing_key": "DYNAMIC",
                "dedup_key": "customer/12345/churn",
                "event_action": "trigger",
                "client": "Sentiment Analysis",
                "client_url": "https://example.com",
                "links": [],
                "images": []
            }
        }
    ],
    "AWS:Reinvent": [
        { 
            title: "DB Upgrade Failure", 
            description: "Database upgrade failed with errors", 
            category: "AWS:Reinvent",
            payload: { 
                "payload": {
                    "summary": "Database upgrade failure",
                    "timestamp": "2023-07-24T15:10:00Z",
                    "severity": "error",
                    "source": "Bugsnag",
                    "class": "AttributeError",
                    "component": "Database",
                    "group": "core-database",
                    "custom_details": {
                        "message": "Database upgrade failure",
                        "handled": false,
                        "project": "core-database",
                        "releaseStage": "production",
                        "stackTrace": "app.clients.data_fetcher.DataFetcherError: DataFetcherClient request failure: GET: /v1/incident/Q3S5XEGJVJ921R/context Message: False",
                        "url": "https://app.bugsnag.com/pagerduty-1/pd-ui-container/errors/abcdefghijklmnop"
                    }
                },
                "routing_key": "DYNAMIC",
                "dedup_key": "12345j233423j4k52345bk24k3j534erqwrtasdfasdfhgjhghjsdefefedjgedjef",
                "event_action": "trigger",
                "client": "Bugsnag",
                "client_url": "https://app.bugsnag.com/pagerduty-1/pd-ui-container/errors/abcdefghijklmnop",
                "links": [],
                "images": []
            }
        },
        { 
            title: "Lambda Timeout", 
            description: "AWS Lambda function timeout", 
            category: "AWS:Reinvent",
            payload: { 
                "payload": {
                    "summary": "Lambda function timeout in payment-processor",
                    "timestamp": "2023-07-24T15:15:00Z",
                    "severity": "critical",
                    "source": "payment-processor",
                    "component": "Lambda",
                    "group": "serverless",
                    "class": "timeout",
                    "custom_details": {
                        "function_name": "payment-processor",
                        "timeout_duration": "30s",
                        "environment": "production",
                        "team": "payments"
                    }
                },
                "routing_key": "DYNAMIC",
                "dedup_key": "payment-processor/timeout",
                "event_action": "trigger",
                "client": "AWS CloudWatch",
                "client_url": "https://console.aws.amazon.com/cloudwatch",
                "links": [],
                "images": []
            }
        }
    ]
};

// Merge additional payloads
Object.assign(payloads, morePayloads);

// Global state
let currentCategory = 'AWS:Reinvent';
let currentEditingEvent = null;
let settings = {
    autoSaveRouting: true,
    showNotifications: true,
    confirmBeforeTrigger: false,
    defaultCategory: 'AWS:Reinvent'
};

// DOM elements
const elements = {
    routingKey: document.getElementById('routingKey'),
    toggleRoutingKey: document.getElementById('toggleRoutingKey'),
    enableRandomDelay: document.getElementById('enableRandomDelay'),
    delayControls: document.getElementById('delayControls'),
    minDelay: document.getElementById('minDelay'),
    maxDelay: document.getElementById('maxDelay'),
    eventsContainer: document.getElementById('eventsContainer'),
    selectionCount: document.getElementById('selectionCount'),
    selectAllBtn: document.getElementById('selectAllBtn'),
    clearAllBtn: document.getElementById('clearAllBtn'),
    triggerBtn: document.getElementById('triggerBtn'),
    loadingSpinner: document.getElementById('loadingSpinner'),
    progressContainer: document.getElementById('progressContainer'),
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),
    modalOverlay: document.getElementById('modalOverlay'),
    jsonEditor: document.getElementById('jsonEditor'),
    saveJson: document.getElementById('saveJson'),
    resetJson: document.getElementById('resetJson'),
    closeModal: document.getElementById('closeModal'),
    settingsModal: document.getElementById('settingsModal'),
    helpModal: document.getElementById('helpModal'),
    toastContainer: document.getElementById('toastContainer')
};

// Initialize the extension
document.addEventListener('DOMContentLoaded', async () => {
    await loadSettings();
    await loadRoutingKey();
    setupEventListeners();
    renderEvents();
    updateSelectionCount();
});
// Load settings from storage
async function loadSettings() {
    try {
        const result = await chrome.storage.sync.get(['triggerIncidentSettings']);
        if (result.triggerIncidentSettings) {
            settings = { ...settings, ...result.triggerIncidentSettings };
        }
        
        // Apply settings to UI
        document.getElementById('autoSaveRouting').checked = settings.autoSaveRouting;
        document.getElementById('showNotifications').checked = settings.showNotifications;
        document.getElementById('confirmBeforeTrigger').checked = settings.confirmBeforeTrigger;
        document.getElementById('defaultCategory').value = settings.defaultCategory;
        
        currentCategory = settings.defaultCategory;
        
        // Update active tab
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.category === currentCategory);
        });
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

// Save settings to storage
async function saveSettings() {
    try {
        await chrome.storage.sync.set({ triggerIncidentSettings: settings });
    } catch (error) {
        console.error('Error saving settings:', error);
    }
}

// Load routing key from storage
async function loadRoutingKey() {
    try {
        const result = await chrome.storage.sync.get(['routingKey']);
        if (result.routingKey) {
            elements.routingKey.value = result.routingKey;
        }
    } catch (error) {
        console.error('Error loading routing key:', error);
    }
}

// Save routing key to storage
async function saveRoutingKey(key) {
    if (settings.autoSaveRouting) {
        try {
            await chrome.storage.sync.set({ routingKey: key });
        } catch (error) {
            console.error('Error saving routing key:', error);
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    // Routing key toggle
    elements.toggleRoutingKey.addEventListener('click', () => {
        const isPassword = elements.routingKey.type === 'password';
        elements.routingKey.type = isPassword ? 'text' : 'password';
        elements.toggleRoutingKey.innerHTML = `<span>${isPassword ? '🙈' : '👁️'}</span>`;
    });

    // Routing key change
    elements.routingKey.addEventListener('input', () => {
        saveRoutingKey(elements.routingKey.value);
        updateSelectionCount();
    });

    // Random delay toggle
    elements.enableRandomDelay.addEventListener('change', () => {
        elements.delayControls.style.display = elements.enableRandomDelay.checked ? 'block' : 'none';
    });

    // Category tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            currentCategory = tab.dataset.category;
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderEvents();
            updateSelectionCount();
        });
    });

    // Selection controls
    elements.selectAllBtn.addEventListener('click', selectAllEvents);
    elements.clearAllBtn.addEventListener('click', clearAllEvents);

    // Trigger button
    elements.triggerBtn.addEventListener('click', triggerEvents);

    // Modal controls
    elements.closeModal.addEventListener('click', closeModal);
    elements.modalOverlay.addEventListener('click', (e) => {
        if (e.target === elements.modalOverlay) closeModal();
    });
    elements.saveJson.addEventListener('click', saveJsonChanges);
    elements.resetJson.addEventListener('click', resetJsonEditor);

    // Settings modal
    document.getElementById('settingsBtn').addEventListener('click', () => {
        elements.settingsModal.style.display = 'flex';
    });
    
    document.getElementById('closeSettings').addEventListener('click', () => {
        elements.settingsModal.style.display = 'none';
    });
    
    document.getElementById('saveSettings').addEventListener('click', () => {
        settings.autoSaveRouting = document.getElementById('autoSaveRouting').checked;
        settings.showNotifications = document.getElementById('showNotifications').checked;
        settings.confirmBeforeTrigger = document.getElementById('confirmBeforeTrigger').checked;
        settings.defaultCategory = document.getElementById('defaultCategory').value;
        saveSettings();
        elements.settingsModal.style.display = 'none';
        showToast('Settings saved successfully!', 'success');
    });
    
    document.getElementById('resetSettings').addEventListener('click', () => {
        settings = {
            autoSaveRouting: true,
            showNotifications: true,
            confirmBeforeTrigger: false,
            defaultCategory: 'AWS:Reinvent'
        };
        loadSettings();
        showToast('Settings reset to defaults', 'info');
    });

    // Help modal
    document.getElementById('helpBtn').addEventListener('click', () => {
        elements.helpModal.style.display = 'flex';
    });
    
    document.getElementById('closeHelp').addEventListener('click', () => {
        elements.helpModal.style.display = 'none';
    });

    // Close modals on overlay click
    [elements.settingsModal, elements.helpModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// Render events for current category
function renderEvents() {
    elements.eventsContainer.innerHTML = '';
    
    let eventsToRender = [];
    
    if (currentCategory === 'Alert Storm') {
        // Show all events from all categories
        Object.keys(payloads).forEach(category => {
            payloads[category].forEach((event, index) => {
                eventsToRender.push({ ...event, originalCategory: category, originalIndex: index });
            });
        });
    } else {
        // Show events from selected category
        eventsToRender = payloads[currentCategory] || [];
    }
    
    eventsToRender.forEach((event, index) => {
        const eventCard = createEventCard(event, index);
        elements.eventsContainer.appendChild(eventCard);
    });
}

// Create event card element
function createEventCard(event, index) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.dataset.index = index;
    card.dataset.category = event.originalCategory || currentCategory;
    card.dataset.originalIndex = event.originalIndex || index;
    
    const categoryIcon = getCategoryIcon(event.originalCategory || currentCategory);
    
    card.innerHTML = `
        <div class="event-header">
            <div class="event-title">
                <span>${categoryIcon}</span>
                <span>${event.title}</span>
            </div>
            <div class="event-actions">
                <input type="checkbox" class="event-checkbox" checked>
                <button class="edit-btn" title="Edit payload">
                    <span>✏️</span>
                </button>
            </div>
        </div>
        <div class="event-description">${event.description}</div>
    `;
    
    // Add event listeners
    const checkbox = card.querySelector('.event-checkbox');
    checkbox.addEventListener('change', () => {
        card.classList.toggle('selected', checkbox.checked);
        updateSelectionCount();
    });
    
    const editBtn = card.querySelector('.edit-btn');
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openJsonEditor(event, card.dataset.category, card.dataset.originalIndex);
    });
    
    // Initial state
    card.classList.add('selected');
    
    return card;
}

// Get category icon
function getCategoryIcon(category) {
    const icons = {
        'AWS:Reinvent': '♦️',
        'Datadog': '🐶',
        'New Relic': '🔍',
        'Prometheus': '🔥',
        'SolarWinds': '☀️',
        'CrowdStrike': '🦅',
        'Customer Sentiment': '😊',
        'Alert Storm': '🌐'
    };
    return icons[category] || '📊';
}

// Update selection count
function updateSelectionCount() {
    const selectedEvents = document.querySelectorAll('.event-checkbox:checked');
    const count = selectedEvents.length;
    elements.selectionCount.textContent = `${count} event${count !== 1 ? 's' : ''} selected`;
    
    elements.triggerBtn.disabled = count === 0 || !elements.routingKey.value.trim();
}

// Select all events
function selectAllEvents() {
    document.querySelectorAll('.event-checkbox').forEach(checkbox => {
        checkbox.checked = true;
        checkbox.closest('.event-card').classList.add('selected');
    });
    updateSelectionCount();
}

// Clear all events
function clearAllEvents() {
    document.querySelectorAll('.event-checkbox').forEach(checkbox => {
        checkbox.checked = false;
        checkbox.closest('.event-card').classList.remove('selected');
    });
    updateSelectionCount();
}

// Open JSON editor modal
function openJsonEditor(event, category, originalIndex) {
    currentEditingEvent = { event, category, originalIndex };
    elements.jsonEditor.value = JSON.stringify(event.payload, null, 2);
    elements.modalOverlay.style.display = 'flex';
}

// Close modal
function closeModal() {
    elements.modalOverlay.style.display = 'none';
    currentEditingEvent = null;
}

// Save JSON changes
function saveJsonChanges() {
    try {
        const updatedPayload = JSON.parse(elements.jsonEditor.value);
        
        if (currentEditingEvent) {
            const { category, originalIndex } = currentEditingEvent;
            payloads[category][originalIndex].payload = updatedPayload;
            showToast('Payload updated successfully!', 'success');
            closeModal();
        }
    } catch (error) {
        showToast('Invalid JSON format. Please check your syntax.', 'error');
    }
}

// Reset JSON editor
function resetJsonEditor() {
    if (currentEditingEvent) {
        elements.jsonEditor.value = JSON.stringify(currentEditingEvent.event.payload, null, 2);
        showToast('JSON reset to original', 'info');
    }
}

// Generate random delay
function getRandomDelay() {
    if (!elements.enableRandomDelay.checked) return 0;
    
    const min = parseInt(elements.minDelay.value) || 1;
    const max = parseInt(elements.maxDelay.value) || 5;
    
    return Math.floor(Math.random() * (max - min + 1) + min) * 1000;
}

// Trigger events
async function triggerEvents() {
    const routingKey = elements.routingKey.value.trim();
    if (!routingKey) {
        showToast('Please enter a routing key', 'error');
        return;
    }
    
    const selectedCards = Array.from(document.querySelectorAll('.event-card'))
        .filter(card => card.querySelector('.event-checkbox').checked);
    
    if (selectedCards.length === 0) {
        showToast('Please select at least one event to trigger', 'error');
        return;
    }
    
    if (settings.confirmBeforeTrigger) {
        const confirmed = confirm(`Are you sure you want to trigger ${selectedCards.length} event(s)?`);
        if (!confirmed) return;
    }
    
    // Prepare UI for triggering
    elements.triggerBtn.disabled = true;
    elements.loadingSpinner.style.display = 'block';
    elements.progressContainer.style.display = 'block';
    elements.progressFill.style.width = '0%';
    elements.progressText.textContent = `0 / ${selectedCards.length} events sent`;
    
    let successCount = 0;
    let errorCount = 0;
    
    try {
        for (let i = 0; i < selectedCards.length; i++) {
            const card = selectedCards[i];
            const category = card.dataset.category;
            const originalIndex = parseInt(card.dataset.originalIndex);
            
            // Get the event payload
            const event = payloads[category][originalIndex];
            const payloadClone = JSON.parse(JSON.stringify(event.payload));
            payloadClone.routing_key = routingKey;
            
            // Update timestamp to current time
            if (payloadClone.payload && payloadClone.payload.timestamp) {
                payloadClone.payload.timestamp = new Date().toISOString();
            }
            
            try {
                const response = await fetch('https://events.pagerduty.com/v2/enqueue', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payloadClone)
                });
                
                if (response.ok) {
                    successCount++;
                    if (settings.showNotifications) {
                        console.log(`Event ${i + 1} triggered successfully:`, event.title);
                    }
                } else {
                    errorCount++;
                    const errorText = await response.text();
                    console.error(`Failed to trigger event ${i + 1}:`, errorText);
                }
            } catch (error) {
                errorCount++;
                console.error(`Error triggering event ${i + 1}:`, error);
            }
            
            // Update progress
            const progress = ((i + 1) / selectedCards.length) * 100;
            elements.progressFill.style.width = `${progress}%`;
            elements.progressText.textContent = `${i + 1} / ${selectedCards.length} events sent`;
            
            // Add random delay if enabled (except for last event)
            if (i < selectedCards.length - 1) {
                const delay = getRandomDelay();
                if (delay > 0) {
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }
        
        // Show final results
        if (successCount > 0) {
            showToast(`Successfully triggered ${successCount} event(s)`, 'success');
        }
        if (errorCount > 0) {
            showToast(`Failed to trigger ${errorCount} event(s)`, 'error');
        }
        
    } catch (error) {
        showToast('An unexpected error occurred', 'error');
        console.error('Trigger error:', error);
    } finally {
        // Reset UI
        elements.triggerBtn.disabled = false;
        elements.loadingSpinner.style.display = 'none';
        setTimeout(() => {
            elements.progressContainer.style.display = 'none';
        }, 2000);
        updateSelectionCount();
    }
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? '✅' :
                 type === 'error' ? '❌' : 'ℹ️';
    
    toast.innerHTML = `
        <span>${icon}</span>
        <span>${message}</span>
    `;
    
    elements.toastContainer.appendChild(toast);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 4000);
}