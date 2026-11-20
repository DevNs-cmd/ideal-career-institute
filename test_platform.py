import urllib.request
import urllib.parse
import json
import sys
import time

BASE_URL = "http://localhost:5000"

def test_endpoint(name, path, method="GET", data=None, headers=None, expected_status=None):
    url = f"{BASE_URL}{path}"
    req_headers = headers or {}
    req_data = None
    if data is not None:
        req_data = json.dumps(data).encode("utf-8")
        req_headers["Content-Type"] = "application/json"
    
    req = urllib.request.Request(url, data=req_data, headers=req_headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            content_type = resp.headers.get("Content-Type", "")
            raw = resp.read()
            if expected_status and resp.status != expected_status:
                print(f"[FAIL] {name} ({method} {path}) -> Expected HTTP {expected_status}, got {resp.status}")
                return None
            if "application/json" in content_type:
                res_json = json.loads(raw.decode("utf-8"))
                print(f"[PASS] {name} ({method} {path}) -> HTTP {resp.status} JSON keys: {list(res_json.keys())}")
                return res_json
            else:
                print(f"[PASS] {name} ({method} {path}) -> HTTP {resp.status} Size: {len(raw)} bytes ({content_type})")
                return raw
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8", errors="ignore")
        if expected_status and e.code == expected_status:
            print(f"[PASS] {name} ({method} {path}) -> Expected HTTP {e.code} correctly handled: {err_body}")
            try:
                return json.loads(err_body)
            except:
                return err_body
        print(f"[FAIL] {name} ({method} {path}) -> HTTP {e.code}: {err_body}")
        return None
    except Exception as e:
        print(f"[FAIL] {name} ({method} {path}) -> Error: {e}")
        return None

print("==================================================================")
print(" IDEAL CAREER INSTITUTE — COMPREHENSIVE QA & VERIFICATION SUITE")
print(" Technology Partner: AlgoForce AI")
print("==================================================================")

# 1. Frontend SPA & Key Assets
test_endpoint("1. Frontend SPA Root HTML", "/")
test_endpoint("2. Official Logo Image", "/assets/logo.png")
test_endpoint("3. Founder Image (team-1.jpg)", "/assets/faculty/team-1.jpg")
test_endpoint("4. Topper Image (Aditya Mishra)", "/assets/toppers/Aditya_Mishra-removebg-preview.png")
test_endpoint("5. Classroom Photo (CR-1.jpeg)", "/assets/institute/CR%20-1.jpeg")

# 2. Public Content APIs
test_endpoint("6. API Health Check", "/api/health")
courses_data = test_endpoint("7. Courses API", "/api/courses")
faculty_data = test_endpoint("8. Faculty API", "/api/faculty")
toppers_data = test_endpoint("9. Toppers API", "/api/toppers")
branches_data = test_endpoint("10. Branches API", "/api/branches")
gallery_data = test_endpoint("11. Gallery API", "/api/gallery")
testimonials_data = test_endpoint("12. Testimonials API", "/api/testimonials")
settings_data = test_endpoint("13. Settings API", "/api/settings")

# 3. Student Admission Enquiry Validation & Submission
dynamic_phone = f"98{int(time.time()) % 100000000:08d}"
enquiry_payload = {
    "student_name": "Rohan Sharma",
    "phone": dynamic_phone,
    "email": "rohan.sharma@example.com",
    "current_class": "Class 12",
    "course_id": 1,
    "branch_id": 1,
    "contact_method": "phone",
    "message": "Interested in enrolling for Commerce batch 2026."
}
enquiry_res = test_endpoint("14. Valid Admission Enquiry Submission", "/api/enquiries", method="POST", data=enquiry_payload)
if enquiry_res:
    print(f"      -> Assigned Unique Enquiry ID: {enquiry_res.get('enquiry_id')}")
    print(f"      -> Direct WhatsApp Chat Link: {enquiry_res.get('whatsapp_link')[:65]}...")

# 4. Security & Validation Checks
invalid_phone = {"student_name": "Bad Phone", "phone": "12345", "course_id": 1}
test_endpoint("15. Phone Validation (Expect 400)", "/api/enquiries", method="POST", data=invalid_phone, expected_status=400)

invalid_email = {"student_name": "Bad Email", "phone": "9810123456", "email": "invalid-email", "course_id": 1}
test_endpoint("16. Email Validation (Expect 400)", "/api/enquiries", method="POST", data=invalid_email, expected_status=400)

# 5. Authentication Suite
login_res = test_endpoint("17. Admin Login (Standard)", "/api/auth/login", method="POST", data={"username": "admin", "password": "Admin@ICI2026!"})
token = login_res.get("token") if login_res else None
auth_header = {"Authorization": f"Bearer {token}"} if token else {}

test_endpoint("18. Admin Login (Case Insensitive 'Admin')", "/api/auth/login", method="POST", data={"username": "Admin", "password": "Admin@ICI2026!"})
test_endpoint("19. Admin Login (Whitespace ' admin ')", "/api/auth/login", method="POST", data={"username": " admin ", "password": "Admin@ICI2026! "})
test_endpoint("20. Admin Login (Shortcut 'admin' / 'admin')", "/api/auth/login", method="POST", data={"username": "admin", "password": "admin"})
test_endpoint("21. Admin Profile Auth Verification (/api/auth/me)", "/api/auth/me", headers=auth_header)

# 6. CRM Lead Management Lifecycle
if token:
    leads_res = test_endpoint("22. Query All CRM Leads", "/api/enquiries", headers=auth_header)
    leads_list = leads_res.get("enquiries", []) if leads_res else []
    print(f"      -> Found {len(leads_list)} leads in database.")
    
    if leads_list:
        test_lead = leads_list[0]
        lead_id = test_lead["id"]
        
        # Status Transition
        test_endpoint(
            "23. Transition Lead Status (Contacted)",
            f"/api/enquiries/{lead_id}/status",
            method="PATCH",
            data={"status": "Contacted", "note": "Spoke with student regarding course curriculum."},
            headers=auth_header
        )
        
        # Add Counsellor Internal Note
        test_endpoint(
            "24. Append Lead Internal Note",
            f"/api/enquiries/{lead_id}/notes",
            method="POST",
            data={"note": "Student attended demo class, showed keen interest."},
            headers=auth_header
        )
        
        # Schedule Follow-up
        test_endpoint(
            "25. Schedule Admission Follow-up",
            f"/api/enquiries/{lead_id}/followups",
            method="POST",
            data={"scheduled_date": "2026-11-28 11:00:00", "notes": "Follow up for fee submission & batch enrollment."},
            headers=auth_header
        )
        
        # Fetch Counsellors
        test_endpoint("26. Fetch Active Counsellors", "/api/enquiries/counsellors", headers=auth_header)
        
        # Fetch Scheduled Follow-ups
        test_endpoint("27. Fetch Scheduled Follow-ups List", "/api/enquiries/followups", headers=auth_header)
        
        # Fetch Audit Trail
        test_endpoint("28. Fetch System Audit Trail", "/api/enquiries/audit", headers=auth_header)

# 7. Management & CMS Settings
test_endpoint("29. Update CMS Website Settings", "/api/settings", method="POST", data={"stats_toppers": "333", "stats_students": "1000"}, headers=auth_header)

# 8. Executive Analytics Dashboard
test_endpoint("30. Executive Analytics API", "/api/analytics", headers=auth_header)

# 9. Demonstration Mode Journey Seeding
test_endpoint("31. Seed Demonstration Journey Data", "/api/demo/seed", method="POST", headers=auth_header)

# 10. CSV Lead Export Download
test_endpoint("32. Download CSV Export of Enquiries", "/api/enquiries/export/csv", headers=auth_header)

print("==================================================================")
print(" ALL 32 QA TESTS COMPLETED")
print("==================================================================")
