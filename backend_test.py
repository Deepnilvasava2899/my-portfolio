#!/usr/bin/env python3
import requests
import json
import time
from datetime import datetime
import os
import sys

# Get the backend URL from the frontend .env file
with open('/app/frontend/.env', 'r') as f:
    for line in f:
        if line.startswith('REACT_APP_BACKEND_URL='):
            BACKEND_URL = line.strip().split('=')[1].strip('"\'')
            break

# Ensure we have a valid backend URL
if not BACKEND_URL:
    print("ERROR: Could not find REACT_APP_BACKEND_URL in frontend/.env")
    sys.exit(1)

# Add /api to the backend URL
API_URL = f"{BACKEND_URL}/api"
print(f"Testing API at: {API_URL}")

# Test results tracking
test_results = {
    "passed": 0,
    "failed": 0,
    "tests": []
}

def run_test(test_name, test_func):
    """Run a test function and track results"""
    print(f"\n{'='*80}\nTEST: {test_name}\n{'='*80}")
    start_time = time.time()
    try:
        result = test_func()
        if result:
            status = "PASSED"
            test_results["passed"] += 1
        else:
            status = "FAILED"
            test_results["failed"] += 1
    except Exception as e:
        print(f"ERROR: {str(e)}")
        status = "FAILED"
        test_results["failed"] += 1
    
    duration = time.time() - start_time
    print(f"TEST RESULT: {status} ({duration:.2f}s)")
    
    test_results["tests"].append({
        "name": test_name,
        "status": status,
        "duration": duration
    })
    
    return status == "PASSED"

def test_root_endpoint():
    """Test the root endpoint"""
    response = requests.get(f"{API_URL}/")
    print(f"Response status code: {response.status_code}")
    print(f"Response body: {response.text}")
    
    if response.status_code != 200:
        print("ERROR: Root endpoint returned non-200 status code")
        return False
    
    data = response.json()
    if data.get("message") != "Deepnil Vasava Portfolio API is running":
        print("ERROR: Root endpoint returned unexpected message")
        return False
    
    return True

def test_health_endpoint():
    """Test the health endpoint"""
    response = requests.get(f"{API_URL}/health")
    print(f"Response status code: {response.status_code}")
    print(f"Response body: {response.text}")
    
    if response.status_code != 200:
        print("ERROR: Health endpoint returned non-200 status code")
        return False
    
    data = response.json()
    if data.get("status") != "healthy":
        print("ERROR: Health endpoint returned unexpected status")
        return False
    
    if "timestamp" not in data:
        print("ERROR: Health endpoint missing timestamp")
        return False
    
    if data.get("service") != "Portfolio API":
        print("ERROR: Health endpoint returned unexpected service name")
        return False
    
    return True

def test_contact_form_submission():
    """Test submitting a contact form"""
    test_data = {
        "name": "Test User",
        "email": "test@example.com",
        "message": "This is a test message from the automated test suite."
    }
    
    response = requests.post(f"{API_URL}/contact", json=test_data)
    print(f"Response status code: {response.status_code}")
    print(f"Response body: {response.text}")
    
    if response.status_code != 200:
        print("ERROR: Contact form submission returned non-200 status code")
        return False
    
    data = response.json()
    if data.get("name") != test_data["name"]:
        print("ERROR: Contact form submission returned unexpected name")
        return False
    
    if data.get("email") != test_data["email"]:
        print("ERROR: Contact form submission returned unexpected email")
        return False
    
    if data.get("message") != test_data["message"]:
        print("ERROR: Contact form submission returned unexpected message")
        return False
    
    if "id" not in data:
        print("ERROR: Contact form submission missing ID")
        return False
    
    if "timestamp" not in data:
        print("ERROR: Contact form submission missing timestamp")
        return False
    
    if data.get("read") is not False:
        print("ERROR: Contact form submission should have read=false")
        return False
    
    # Store the message ID for later tests
    global test_message_id
    test_message_id = data["id"]
    
    return True

def test_get_contact_messages():
    """Test retrieving contact messages"""
    response = requests.get(f"{API_URL}/contact")
    print(f"Response status code: {response.status_code}")
    print(f"Response body: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code != 200:
        print("ERROR: Get contact messages returned non-200 status code")
        return False
    
    data = response.json()
    if not isinstance(data, list):
        print("ERROR: Get contact messages should return a list")
        return False
    
    # Check if our test message is in the list
    found_test_message = False
    for message in data:
        if message.get("id") == test_message_id:
            found_test_message = True
            break
    
    if not found_test_message:
        print("ERROR: Could not find our test message in the list")
        return False
    
    return True

def test_get_contact_messages_pagination():
    """Test retrieving contact messages with pagination"""
    # Test with limit=1
    response = requests.get(f"{API_URL}/contact?limit=1")
    print(f"Response status code: {response.status_code}")
    print(f"Response body (limit=1): {json.dumps(response.json(), indent=2)}")
    
    if response.status_code != 200:
        print("ERROR: Get contact messages with pagination returned non-200 status code")
        return False
    
    data = response.json()
    if not isinstance(data, list):
        print("ERROR: Get contact messages with pagination should return a list")
        return False
    
    if len(data) > 1:
        print("ERROR: Get contact messages with limit=1 returned more than 1 message")
        return False
    
    # Test with skip=1
    response = requests.get(f"{API_URL}/contact?skip=1&limit=10")
    print(f"Response status code: {response.status_code}")
    print(f"Response body (skip=1): {json.dumps(response.json(), indent=2)}")
    
    if response.status_code != 200:
        print("ERROR: Get contact messages with skip returned non-200 status code")
        return False
    
    return True

def test_mark_message_read():
    """Test marking a message as read"""
    response = requests.patch(f"{API_URL}/contact/{test_message_id}/read")
    print(f"Response status code: {response.status_code}")
    print(f"Response body: {response.text}")
    
    if response.status_code != 200:
        print("ERROR: Mark message read returned non-200 status code")
        return False
    
    data = response.json()
    if data.get("message") != "Message marked as read":
        print("ERROR: Mark message read returned unexpected message")
        return False
    
    # Verify the message is now marked as read
    response = requests.get(f"{API_URL}/contact")
    if response.status_code != 200:
        print("ERROR: Failed to verify message read status")
        return False
    
    data = response.json()
    for message in data:
        if message.get("id") == test_message_id:
            if message.get("read") is not True:
                print("ERROR: Message was not marked as read")
                return False
            break
    
    return True

def test_mark_nonexistent_message_read():
    """Test marking a non-existent message as read"""
    fake_id = "00000000-0000-0000-0000-000000000000"
    response = requests.patch(f"{API_URL}/contact/{fake_id}/read")
    print(f"Response status code: {response.status_code}")
    print(f"Response body: {response.text}")
    
    if response.status_code != 404:
        print("ERROR: Mark non-existent message read should return 404")
        return False
    
    return True

def test_get_portfolio_stats():
    """Test retrieving portfolio stats"""
    response = requests.get(f"{API_URL}/stats")
    print(f"Response status code: {response.status_code}")
    print(f"Response body: {response.text}")
    
    if response.status_code != 200:
        print("ERROR: Get portfolio stats returned non-200 status code")
        return False
    
    data = response.json()
    if "total_messages" not in data:
        print("ERROR: Portfolio stats missing total_messages")
        return False
    
    if "unread_messages" not in data:
        print("ERROR: Portfolio stats missing unread_messages")
        return False
    
    if "last_updated" not in data:
        print("ERROR: Portfolio stats missing last_updated")
        return False
    
    return True

def test_create_status_check():
    """Test creating a status check"""
    test_data = {
        "client_name": "Test Client"
    }
    
    response = requests.post(f"{API_URL}/status", json=test_data)
    print(f"Response status code: {response.status_code}")
    print(f"Response body: {response.text}")
    
    if response.status_code != 200:
        print("ERROR: Create status check returned non-200 status code")
        return False
    
    data = response.json()
    if data.get("client_name") != test_data["client_name"]:
        print("ERROR: Create status check returned unexpected client_name")
        return False
    
    if "id" not in data:
        print("ERROR: Create status check missing ID")
        return False
    
    if "timestamp" not in data:
        print("ERROR: Create status check missing timestamp")
        return False
    
    # Store the status check ID for later tests
    global test_status_id
    test_status_id = data["id"]
    
    return True

def test_get_status_checks():
    """Test retrieving status checks"""
    response = requests.get(f"{API_URL}/status")
    print(f"Response status code: {response.status_code}")
    print(f"Response body: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code != 200:
        print("ERROR: Get status checks returned non-200 status code")
        return False
    
    data = response.json()
    if not isinstance(data, list):
        print("ERROR: Get status checks should return a list")
        return False
    
    # Check if our test status check is in the list
    found_test_status = False
    for status in data:
        if status.get("id") == test_status_id:
            found_test_status = True
            break
    
    if not found_test_status:
        print("ERROR: Could not find our test status check in the list")
        return False
    
    return True

def run_all_tests():
    """Run all tests and print a summary"""
    # Initialize test message ID
    global test_message_id
    test_message_id = None
    
    # Initialize test status ID
    global test_status_id
    test_status_id = None
    
    # Run all tests
    run_test("Root Endpoint", test_root_endpoint)
    run_test("Health Endpoint", test_health_endpoint)
    run_test("Contact Form Submission", test_contact_form_submission)
    
    # Only run these tests if contact form submission passed
    if test_message_id:
        run_test("Get Contact Messages", test_get_contact_messages)
        run_test("Get Contact Messages Pagination", test_get_contact_messages_pagination)
        run_test("Mark Message Read", test_mark_message_read)
    
    run_test("Mark Non-existent Message Read", test_mark_nonexistent_message_read)
    run_test("Get Portfolio Stats", test_get_portfolio_stats)
    run_test("Create Status Check", test_create_status_check)
    
    # Only run this test if status check creation passed
    if test_status_id:
        run_test("Get Status Checks", test_get_status_checks)
    
    # Print summary
    print(f"\n{'='*80}\nTEST SUMMARY\n{'='*80}")
    print(f"Total tests: {test_results['passed'] + test_results['failed']}")
    print(f"Passed: {test_results['passed']}")
    print(f"Failed: {test_results['failed']}")
    
    # Print detailed results
    print("\nDetailed Results:")
    for test in test_results["tests"]:
        print(f"  {test['name']}: {test['status']} ({test['duration']:.2f}s)")
    
    return test_results["failed"] == 0

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)