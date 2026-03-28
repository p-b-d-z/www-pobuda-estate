#!/usr/bin/env python3
import requests
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

URL = "https://pobuda.estate"
KEYWORDS = ["info@pobuda.estate", "Technical Consulting"]


def test_site_operational():
    response = requests.get(URL, timeout=10)
    response.raise_for_status()

    content = response.text

    found = []
    missing = []
    for keyword in KEYWORDS:
        if keyword.lower() in content.lower():
            found.append(keyword)
        else:
            missing.append(keyword)

    print(f"Status: {response.status_code}")
    print(f"Found: {found}")

    if missing:
        print(f"Missing: {missing}")
        return False
    return True


def test_logo_accessible():
    logo_url = "https://images.pobuda.estate/logo.png"
    response = requests.get(logo_url, timeout=30, verify=False)
    response.raise_for_status()
    print(f"Logo Status: {response.status_code}")
    return response.status_code == 200


if __name__ == "__main__":
    try:
        success = test_site_operational() and test_logo_accessible()
        exit(0 if success else 1)
    except Exception as e:
        print(f"Error: {e}")
        exit(1)
