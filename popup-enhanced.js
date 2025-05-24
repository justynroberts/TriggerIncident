// Global state
let currentCategory = 'Alert Storm';
let payloads = {};

// DOM elements
const elements = {
    routingKey: document.getElementById('routingKey'),
    toggleRoutingKey: document.getElementById('toggleRoutingKey'),
    routingKeySection: document.getElementById('routingKeySection'),
    routingKeyStatus: document.getElementById('routingKeyStatus'),
    changeRoutingKey: document.getElementById('changeRoutingKey'),
    enableRandomDelay: document.getElementById('enableRandomDelay'),
    delayControls: document.getElementById('delayControls'),
    minDelay: document.getElementById('minDelay'),
    maxDelay: document.getElementById('maxDelay'),
    eventsContainer: document.getElementById('eventsContainer'),
    selectionCount: document.getElementById('selectionCount'),
    triggerSelectionCount: document.getElementById('triggerSelectionCount'),
    selectAllBtn: document.getElementById('selectAllBtn'),
    clearAllBtn: document.getElementById('clearAllBtn'),
    addCustomBtn: document.getElementById('addCustomBtn'),
    managePayloadsBtn: document.getElementById('managePayloadsBtn'),
    triggerBtn: document.getElementById('triggerBtn'),
    loadingSpinner: document.getElementById('loadingSpinner'),
    progressContainer: document.getElementById('progressContainer'),
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),
    customPayloadModal: document.getElementById('customPayloadModal'),
    importExportModal: document.getElementById('importExportModal')
};

// Initialize the extension
document.addEventListener('DOMContentLoaded', async () => {
    await loadPayloads();
    await loadSettings();
    setupEventListeners();
    renderEvents();
    updateSelectionCount();
    checkRoutingKeyStatus();
});

// Load payloads from storage or use defaults
async function loadPayloads() {
    try {
        const result = await chrome.storage.local.get(['customPayloads']);
        if (result.customPayloads) {
            payloads = result.customPayloads;
        } else {
            // Use default payloads from payloads.js
            payloads = JSON.parse(JSON.stringify(defaultPayloads));
            await savePayloads();
        }
    } catch (error) {
        console.error('Error loading payloads:', error);
        payloads = JSON.parse(JSON.stringify(defaultPayloads));
    }
}

// Save payloads to storage
async function savePayloads() {
    try {
        await chrome.storage.local.set({ customPayloads: payloads });
    } catch (error) {
        console.error('Error saving payloads:', error);
        // If still quota exceeded, try to save only essential data
        if (error.message.includes('quota')) {
            try {
                // Save only custom payloads, not the entire default set
                const customOnly = { Custom: payloads.Custom || [] };
                await chrome.storage.local.set({ customPayloads: customOnly });
                console.log('Saved custom payloads only due to quota limits');
            } catch (fallbackError) {
                console.error('Failed to save even custom payloads:', fallbackError);
            }
        }
    }
}

// Load settings from localStorage
async function loadSettings() {
    try {
        // Load routing key
        const routingKey = localStorage.getItem('triggerincident_routing_key');
        if (routingKey) {
            elements.routingKey.value = routingKey;
        }

        // Load random delay settings
        const enableRandomDelay = localStorage.getItem('triggerincident_enable_random_delay');
        if (enableRandomDelay === 'true') {
            elements.enableRandomDelay.checked = true;
            elements.delayControls.style.display = 'block';
        }

        const minDelay = localStorage.getItem('triggerincident_min_delay');
        if (minDelay) {
            elements.minDelay.value = minDelay;
        }

        const maxDelay = localStorage.getItem('triggerincident_max_delay');
        if (maxDelay) {
            elements.maxDelay.value = maxDelay;
        }
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

// Save settings to localStorage
function saveSettings() {
    try {
        localStorage.setItem('triggerincident_routing_key', elements.routingKey.value);
        localStorage.setItem('triggerincident_enable_random_delay', elements.enableRandomDelay.checked);
        localStorage.setItem('triggerincident_min_delay', elements.minDelay.value);
        localStorage.setItem('triggerincident_max_delay', elements.maxDelay.value);
    } catch (error) {
        console.error('Error saving settings:', error);
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
        updateSelectionCount();
        checkRoutingKeyStatus();
        saveSettings();
    });

    // Change routing key button
    elements.changeRoutingKey.addEventListener('click', () => {
        showRoutingKeySection();
    });

    // Random delay toggle
    elements.enableRandomDelay.addEventListener('change', () => {
        elements.delayControls.style.display = elements.enableRandomDelay.checked ? 'block' : 'none';
        saveSettings();
    });

    // Delay range inputs
    elements.minDelay.addEventListener('input', saveSettings);
    elements.maxDelay.addEventListener('input', saveSettings);

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

    // Management buttons
    elements.addCustomBtn.addEventListener('click', openCustomPayloadModal);
    elements.managePayloadsBtn.addEventListener('click', openImportExportModal);

    // Trigger button
    elements.triggerBtn.addEventListener('click', triggerEvents);

    // Custom payload modal
    document.getElementById('closeCustomModal').addEventListener('click', closeCustomPayloadModal);
    document.getElementById('cancelCustom').addEventListener('click', closeCustomPayloadModal);
    document.getElementById('saveCustom').addEventListener('click', saveCustomPayload);

    // Import/Export modal
    document.getElementById('closeImportExportModal').addEventListener('click', closeImportExportModal);
    document.getElementById('exportPayloads').addEventListener('click', exportPayloads);
    document.getElementById('importPayloads').addEventListener('click', importPayloads);
    document.getElementById('resetToDefaults').addEventListener('click', resetToDefaults);

    // Close modals on overlay click
    [elements.customPayloadModal, elements.importExportModal].forEach(modal => {
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
            if (category !== 'Alert Storm') {
                payloads[category].forEach((event, index) => {
                    eventsToRender.push({
                        ...event,
                        originalCategory: category,
                        originalIndex: index
                    });
                });
            }
        });
    } else {
        // Show events from selected category
        eventsToRender = (payloads[currentCategory] || []).map((event, index) => ({
            ...event,
            originalCategory: currentCategory,
            originalIndex: index
        }));
    }
    
    eventsToRender.forEach((event, index) => {
        const eventCard = createEventCard(event, index);
        elements.eventsContainer.appendChild(eventCard);
    });

    // Show add custom button for Custom category
    if (currentCategory === 'Custom') {
        const addCard = createAddCustomCard();
        elements.eventsContainer.appendChild(addCard);
    }
}

// Create event card element
function createEventCard(event, index) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.dataset.index = index;
    card.dataset.category = event.originalCategory || currentCategory;
    card.dataset.originalIndex = event.originalIndex !== undefined ? event.originalIndex : index;
    
    const categoryIcon = getCategoryIcon(event.originalCategory || currentCategory);
    
    card.innerHTML = `
        <div class="event-header">
            <div class="event-title">
                <span>${categoryIcon}</span>
                <span>${event.title}</span>
            </div>
            <div class="event-actions">
                <input type="checkbox" class="event-checkbox" checked title="Select this event for triggering">
                <button class="edit-btn" title="View event payload (read-only)">
                    <span>👁️</span>
                </button>
                ${currentCategory === 'Custom' ? '<button class="delete-btn" title="Delete this custom event"><span>🗑️</span></button>' : ''}
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
        showPayloadAlert(event);
    });

    const deleteBtn = card.querySelector('.delete-btn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteCustomEvent(index);
        });
    }
    
    // Initial state
    card.classList.add('selected');
    
    return card;
}

// Create add custom card
function createAddCustomCard() {
    const card = document.createElement('div');
    card.className = 'event-card add-custom-card';
    card.style.cursor = 'pointer';
    card.style.border = '2px dashed #7b68ee';
    card.style.textAlign = 'center';
    card.style.display = 'flex';
    card.style.alignItems = 'center';
    card.style.justifyContent = 'center';
    card.style.minHeight = '100px';
    
    card.innerHTML = `
        <div style="color: #7b68ee;">
            <div style="font-size: 24px; margin-bottom: 8px;">➕</div>
            <div style="font-weight: 600;">Add Custom Event</div>
            <div style="font-size: 12px; color: #adb5bd;">Click to create a new custom payload</div>
        </div>
    `;
    
    card.addEventListener('click', openCustomPayloadModal);
    
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
        'Custom': '⚙️',
        'Alert Storm': '🌐'
    };
    return icons[category] || '📊';
}

// Show payload in alert (view-only)
function showPayloadAlert(event) {
    showPayloadModal(event);
}

// Show payload in a modal instead of alert
function showPayloadModal(event) {
    const payload = JSON.stringify(event.payload, null, 2);
    
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.style.display = 'flex';
    
    modalOverlay.innerHTML = `
        <div class="modal" style="max-width: 600px; max-height: 80vh;">
            <div class="modal-header">
                <h3>📋 View Payload: "${event.title}"</h3>
                <button class="close-btn" onclick="this.closest('.modal-overlay').remove()">
                    <span>✕</span>
                </button>
            </div>
            <div class="modal-content" style="max-height: 60vh; overflow-y: auto;">
                <pre style="background: #393939; padding: 16px; border-radius: 4px; color: #f4f4f4; font-family: monospace; font-size: 12px; line-height: 1.4; white-space: pre-wrap; word-wrap: break-word;">${payload}</pre>
            </div>
            <div class="modal-footer">
                <button class="btn secondary" onclick="navigator.clipboard.writeText('${payload.replace(/'/g, "\\'")}').then(() => showToast('📋 Payload copied to clipboard!', 'success', 3000))">📋 Copy</button>
                <button class="btn primary" onclick="this.closest('.modal-overlay').remove()">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    
    // Close on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.remove();
        }
    });
}

// Update selection count
function updateSelectionCount() {
    const selectedEvents = document.querySelectorAll('.event-checkbox:checked');
    const count = selectedEvents.length;
    elements.selectionCount.textContent = `${count} event${count !== 1 ? 's' : ''} selected`;
    
    // Update trigger selection count (using "alerts" terminology)
    if (elements.triggerSelectionCount) {
        elements.triggerSelectionCount.textContent = `${count} alert${count !== 1 ? 's' : ''} selected`;
    }
    
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

// Custom payload modal functions
function openCustomPayloadModal() {
    document.getElementById('customTitle').value = '';
    document.getElementById('customDescription').value = '';
    document.getElementById('customPayload').value = JSON.stringify({
        "payload": {
            "summary": "Custom event summary",
            "timestamp": new Date().toISOString(),
            "severity": "critical",
            "source": "custom-source",
            "component": "Custom",
            "group": "custom",
            "class": "custom"
        },
        "routing_key": "DYNAMIC",
        "dedup_key": "custom-event",
        "event_action": "trigger",
        "client": "TriggerIncident Extension"
    }, null, 2);
    elements.customPayloadModal.style.display = 'flex';
}

function closeCustomPayloadModal() {
    elements.customPayloadModal.style.display = 'none';
}

async function saveCustomPayload() {
    const title = document.getElementById('customTitle').value.trim();
    const description = document.getElementById('customDescription').value.trim();
    const payloadText = document.getElementById('customPayload').value.trim();

    if (!title || !description || !payloadText) {
        showToast('⚠️ Please fill in all fields', 'error', 4000);
        return;
    }

    try {
        const payload = JSON.parse(payloadText);
        
        const customEvent = {
            title: title,
            description: description,
            category: 'Custom',
            payload: payload
        };

        if (!payloads.Custom) {
            payloads.Custom = [];
        }
        
        payloads.Custom.push(customEvent);
        await savePayloads();
        
        closeCustomPayloadModal();
        
        if (currentCategory === 'Custom') {
            renderEvents();
        }
        
        showToast('✅ Custom event saved successfully!', 'success', 4000);
    } catch (error) {
        showToast('❌ Invalid JSON payload. Please check your syntax.', 'error', 4000);
    }
}

function deleteCustomEvent(index) {
    if (confirm('Are you sure you want to delete this custom event?')) {
        payloads.Custom.splice(index, 1);
        savePayloads();
        renderEvents();
        updateSelectionCount();
    }
}

// Import/Export modal functions
function openImportExportModal() {
    elements.importExportModal.style.display = 'flex';
}

function closeImportExportModal() {
    elements.importExportModal.style.display = 'none';
}

function exportPayloads() {
    const dataStr = JSON.stringify(payloads, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `triggerincident-payloads-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showToast('✅ Payloads exported successfully!', 'success', 4000);
}

function importPayloads() {
    const fileInput = document.getElementById('importFile');
    const file = fileInput.files[0];
    
    if (!file) {
        showToast('⚠️ Please select a file to import', 'error', 4000);
        return;
    }
    
    const reader = new FileReader();
    reader.onload = async function(e) {
        try {
            const importedPayloads = JSON.parse(e.target.result);
            
            // Validate the structure
            if (typeof importedPayloads !== 'object') {
                throw new Error('Invalid file format');
            }
            
            payloads = importedPayloads;
            await savePayloads();
            
            renderEvents();
            updateSelectionCount();
            closeImportExportModal();
            
            showToast('✅ Payloads imported successfully!', 'success', 4000);
        } catch (error) {
            showToast('❌ Error importing file: ' + error.message, 'error', 4000);
        }
    };
    
    reader.readAsText(file);
}

async function resetToDefaults() {
    if (confirm('Are you sure you want to reset all payloads to defaults? This will delete all custom events.')) {
        payloads = JSON.parse(JSON.stringify(defaultPayloads));
        await savePayloads();
        
        renderEvents();
        updateSelectionCount();
        closeImportExportModal();
        
        showToast('✅ Payloads reset to defaults successfully!', 'success', 4000);
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
        showToast('⚠️ Please enter a routing key', 'error', 4000);
        return;
    }
    
    const selectedCards = Array.from(document.querySelectorAll('.event-card'))
        .filter(card => card.querySelector('.event-checkbox')?.checked);
    
    if (selectedCards.length === 0) {
        showToast('⚠️ Please select at least one event to trigger', 'error', 4000);
        return;
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
            const event = payloads[category]?.[originalIndex];
            if (!event || !event.payload) {
                console.error(`Event not found: category=${category}, index=${originalIndex}`);
                errorCount++;
                continue;
            }
            const payloadClone = JSON.parse(JSON.stringify(event.payload));
            payloadClone.routing_key = routingKey;
            
            // Update timestamp to current time
            if (payloadClone.payload && payloadClone.payload.timestamp) {
                payloadClone.payload.timestamp = new Date().toISOString();
            }
            
            try {
                // Show visual feedback for each event being sent
                showToast(`📤 Sending: ${event.title}`, 'info', 2000);
                
                const response = await fetch('https://events.pagerduty.com/v2/enqueue', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payloadClone)
                });
                
                if (response.ok) {
                    successCount++;
                    showToast(`✅ Sent: ${event.title}`, 'success', 3000);
                    console.log(`Event ${i + 1} triggered successfully:`, event.title);
                } else {
                    errorCount++;
                    const errorText = await response.text();
                    showToast(`❌ Failed: ${event.title}`, 'error', 4000);
                    console.error(`Failed to trigger event ${i + 1}:`, errorText);
                }
            } catch (error) {
                errorCount++;
                showToast(`❌ Error: ${event.title}`, 'error', 4000);
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
        
        // Show final results via toast (no more alert popups)
        if (successCount > 0) {
            showToast(`✅ Successfully triggered ${successCount} event${successCount !== 1 ? 's' : ''}!`, 'success', 5000);
        }
        if (errorCount > 0) {
            showToast(`❌ Failed to trigger ${errorCount} event${errorCount !== 1 ? 's' : ''}`, 'error', 5000);
        }
        
    } catch (error) {
        showToast('❌ An unexpected error occurred', 'error', 5000);
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

// Show toast notification with custom duration
function showToast(message, type = 'info', duration = 4000) {
    const toastContainer = elements.toastContainer || document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.style.cssText = `
        background: ${type === 'success' ? '#42be65' : type === 'error' ? '#da1e28' : '#0f62fe'};
        color: white;
        padding: 12px 16px;
        margin-bottom: 8px;
        border-radius: 4px;
        font-size: 14px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        animation: slideInRight 0.3s ease;
        position: relative;
        overflow: hidden;
    `;
    
    toast.innerHTML = `<span>${message}</span>`;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after specified duration
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, duration);
}

// Check routing key status and show/hide sections accordingly
function checkRoutingKeyStatus() {
    const routingKey = elements.routingKey.value.trim();
    
    if (routingKey) {
        // Hide the routing key input section
        elements.routingKeySection.style.display = 'none';
        // Show the status section
        elements.routingKeyStatus.style.display = 'block';
    } else {
        // Show the routing key input section
        elements.routingKeySection.style.display = 'block';
        // Hide the status section
        elements.routingKeyStatus.style.display = 'none';
    }
}

// Show routing key section for editing
function showRoutingKeySection() {
    elements.routingKeySection.style.display = 'block';
    elements.routingKeyStatus.style.display = 'none';
    elements.routingKey.focus();
}