// Minimal popup functionality
document.addEventListener('DOMContentLoaded', function() {
    const routingKeyInput = document.getElementById('routingKey');
    const enableDelayCheckbox = document.getElementById('enableDelay');
    const triggerBtn = document.getElementById('triggerBtn');
    const statusDiv = document.getElementById('status');
    const eventCheckboxes = document.querySelectorAll('.event-checkbox');

    // Update button state
    function updateButtonState() {
        const hasRoutingKey = routingKeyInput.value.trim().length > 0;
        const hasSelectedEvents = Array.from(eventCheckboxes).some(cb => cb.checked);
        const selectedCount = Array.from(eventCheckboxes).filter(cb => cb.checked).length;
        
        triggerBtn.disabled = !hasRoutingKey || !hasSelectedEvents;
        
        if (!hasRoutingKey) {
            statusDiv.textContent = 'Enter routing key to continue';
        } else if (!hasSelectedEvents) {
            statusDiv.textContent = 'Select at least one event';
        } else {
            statusDiv.textContent = `Ready to trigger ${selectedCount} event${selectedCount !== 1 ? 's' : ''}`;
        }
    }

    // Event listeners
    routingKeyInput.addEventListener('input', updateButtonState);
    eventCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateButtonState);
    });

    // Trigger events
    triggerBtn.addEventListener('click', async function() {
        const routingKey = routingKeyInput.value.trim();
        const selectedEvents = Array.from(eventCheckboxes).filter(cb => cb.checked);
        
        if (!routingKey || selectedEvents.length === 0) {
            alert('Please enter routing key and select events');
            return;
        }

        triggerBtn.disabled = true;
        triggerBtn.textContent = '🔄 Triggering...';
        statusDiv.textContent = 'Sending events to PagerDuty...';

        let successCount = 0;
        let errorCount = 0;

        try {
            for (let i = 0; i < selectedEvents.length; i++) {
                const event = selectedEvents[i];
                const eventTitle = event.getAttribute('data-title');
                
                const payload = {
                    routing_key: routingKey,
                    event_action: "trigger",
                    payload: {
                        summary: eventTitle,
                        timestamp: new Date().toISOString(),
                        severity: "critical",
                        source: "TriggerIncident Chrome Extension",
                        component: "Test Event",
                        group: "testing",
                        class: "test"
                    }
                };

                try {
                    const response = await fetch('https://events.pagerduty.com/v2/enqueue', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });

                    if (response.ok) {
                        successCount++;
                        console.log(`Successfully triggered: ${eventTitle}`);
                    } else {
                        errorCount++;
                        console.error(`Failed to trigger: ${eventTitle}`, await response.text());
                    }
                } catch (error) {
                    errorCount++;
                    console.error(`Error triggering: ${eventTitle}`, error);
                }

                // Add delay if enabled and not the last event
                if (enableDelayCheckbox.checked && i < selectedEvents.length - 1) {
                    const delay = Math.floor(Math.random() * 4000) + 1000; // 1-5 seconds
                    statusDiv.textContent = `Waiting ${Math.ceil(delay/1000)}s before next event...`;
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }

            // Show results
            if (successCount > 0 && errorCount === 0) {
                statusDiv.textContent = `✅ Successfully triggered ${successCount} event${successCount !== 1 ? 's' : ''}!`;
                alert(`Success! Triggered ${successCount} event${successCount !== 1 ? 's' : ''}.`);
            } else if (successCount > 0 && errorCount > 0) {
                statusDiv.textContent = `⚠️ ${successCount} succeeded, ${errorCount} failed`;
                alert(`Partial success: ${successCount} events triggered, ${errorCount} failed.`);
            } else {
                statusDiv.textContent = `❌ All ${errorCount} events failed`;
                alert(`Error: All ${errorCount} events failed to trigger.`);
            }

        } catch (error) {
            statusDiv.textContent = '❌ An error occurred';
            alert('An unexpected error occurred');
            console.error('Trigger error:', error);
        } finally {
            triggerBtn.disabled = false;
            triggerBtn.textContent = '🔥 Trigger Events';
            setTimeout(() => {
                updateButtonState();
            }, 3000);
        }
    });

    // Initial state
    updateButtonState();
});