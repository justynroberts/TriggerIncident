// Default event payload data - can be imported/exported
const defaultPayloads = {
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
    ],
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
    ],
    "Custom": []
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { defaultPayloads };
}