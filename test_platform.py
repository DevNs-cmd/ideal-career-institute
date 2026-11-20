import urllib.request
import urllib.parse
import json
import sys

BASE_URL = "http://localhost:5000"

def test_endpoint(name, path, method="GET", data=None, headers=None):
    url = f"{BASE_URL}{path}"
    req_headers = headers or {}
    req_data = None
    if data:
        req_data = json.dumps(data).encode("utf-8")
        req_headers["Content-Type"] = "application/json"
    
    req = urllib.request.Request(url, data=req_data, headers=req_headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            content_type = resp.headers.get("Content-Type", "")
            raw = resp.read()
            if "application/json" in content_type:
                res_json = json.loads(raw.decode("utf-8"))
                print(f"[PASS] {name} ({method} {path}) -> HTTP {resp.status} JSON keys: {list(res_json.keys())}")
                return res_json
            else:
                print(f"[PASS] {name} ({method} {path}) -> HTTP {resp.status} Size: {len(raw)} bytes ({content_type})")
                return raw
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8", errors="ignore")
        print(f"[FAIL] {name} ({method} {path}) -> HTTP {e.code}: {err_body}")
        return None
    except Exception as e:
        print(f"[FAIL] {name} ({method} {path}) -> Error: {e}")
        return None

print("==================================================")
print(" IDEAL CAREER INSTITUTE — AUTOMATED QA TEST SUITE")
print("==================================================")

# 1. Frontend SPA
test_endpoint("1. Frontend SPA Root HTML", "/")

# 2. Key Assets
test_endpoint("2. Official Logo Image", "/assets/logo.png")
test_endpoint("3. Founder Image", "/assets/faculty/team-1.jpg")
test_endpoint("4. Topper Image (Aditya Mishra)", "/assets/toppers/Aditya_Mishra-removebg-preview.png")
test_endpoint("5. Classroom Photo", "/assets/institute/CR%20-1.jpeg")

# 3. Public APIs
test_endpoint("6. API Health Check", "/api/health")
courses_data = test_endpoint("7. Courses API", "/api/courses")
faculty_data = test_endpoint("8. Faculty API", "/api/faculty")
toppers_data = test_endpoint("9. Toppers API", "/api/toppers")
branches_data = test_endpoint("10. Branches API", "/api/branches")
gallery_data = test_endpoint("11. Gallery API", "/api/gallery")
settings_data = test_endpoint("12. Settings API", "/api/settings")

# 4. Student Enquiry Submission
enquiry_payload = {
    "student_name": "QA Verification Student",
    "phone": "9876543210",
    "email": "qa.student@example.com",
    "current_class": "Class 12",
    "course_id": 2,
    "branch_id": 1,
    "contact_method": "phone",
    "message": "Automated verification test of enquiry submission."
}
enquiry_res = test_endpoint("13. Submit Admission Enquiry", "/api/enquiries", method="POST", data=enquiry_payload)
if enquiry_res:
    print(f"      -> Generated Enquiry ID: {enquiry_res.get('enquiry_id')}")
    print(f"      -> WhatsApp Direct Link: {enquiry_res.get('whatsapp_link')[:60]}...")

# 5. Invalid Phone Validation Test (should fail gracefully with 400)
invalid_payload = {
    "student_name": "Test",
    "phone": "12345", # invalid
    "course_id": 1
}
test_endpoint("14. Phone Validation Security Check (Expect 400)", "/api/enquiries", method="POST", data=invalid_payload)

# 6. Admin Authentication
login_payload = {"username": "admin", "password": "Admin@ICI2026!"}
login_res = test_endpoint("15. Admin Login Authentication", "/api/auth/login", method="POST", data=login_payload)
token = login_res.get("token") if login_res else None
auth_header = {"Authorization": f"Bearer {token}"} if token else {}

# 7. Authenticated CRM Endpoints
if token:
    leads_res = test_endpoint("16. CRM Leads Query", "/api/enquiries", headers=auth_header)
    leads_list = leads_res.get("enquiries", []) if leads_res else []
    print(f"      -> Retrieved {len(leads_list)} leads from database.")
    
    if leads_list:
        first_lead_id = leads_list[0]["id"]
        # Status change
        test_endpoint("17. Update Lead Status", f"/api/enquiries/{first_lead_id}/status", method="PATCH", data={"status": "Contacted", "note": "Spoke via telephone verification."}, headers=auth_header)
        # Follow-up
        test_endpoint("18. Schedule Follow-up", f"/api/enquiries/{first_lead_id}/followups", method="POST", data={"scheduled_date": "2026-11-25 10:00:00", "notes": "Parent admission visit."}, headers=auth_header)
        
    # Analytics
    test_endpoint("19. Executive Analytics Dashboard API", "/api/analytics", headers=auth_header)
    
    # Demonstration Mode Seeding
    test_endpoint("20. Executive Demo Journey Seeding", "/api/demo/seed", method="POST", headers=auth_header)
    
    # CSV Export
    test_endpoint("21. CSV Leads Export Download", "/api/enquiries/export/csv", headers=auth_header)

print("==================================================")
print(" QA VERIFICATION TEST COMPLETE")
print("==================================================")
