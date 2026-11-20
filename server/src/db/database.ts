import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';

const DB_DIR = path.resolve(__dirname, '../../data');
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const DB_PATH = path.join(DB_DIR, 'ideal_career_institute.db');
export const db = new DatabaseSync(DB_PATH);

// Enable WAL mode & foreign keys for concurrency and integrity
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;
`);

export function initDatabase() {
  db.exec(`
    -- 1. Admin Users
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      full_name TEXT NOT NULL,
      role TEXT DEFAULT 'admin', -- 'superadmin', 'counsellor', 'admin'
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 2. Branches
    CREATE TABLE IF NOT EXISTS branches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      phone TEXT NOT NULL,
      timings TEXT NOT NULL,
      map_url TEXT,
      is_active INTEGER DEFAULT 1,
      is_verified INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 3. Courses
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      category TEXT NOT NULL, -- 'School Education', 'Skill Development', 'Competitive Examinations'
      target_audience TEXT,
      short_description TEXT NOT NULL,
      full_description TEXT NOT NULL,
      eligibility TEXT,
      duration TEXT,
      highlights TEXT, -- JSON array of bullet points
      icon TEXT,
      is_published INTEGER DEFAULT 1,
      order_index INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 4. Counsellors
    CREATE TABLE IF NOT EXISTS counsellors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 5. Enquiries / Leads
    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      enquiry_id TEXT UNIQUE NOT NULL,
      student_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      current_class TEXT,
      course_id INTEGER,
      branch_id INTEGER,
      contact_method TEXT DEFAULT 'phone', -- 'phone', 'whatsapp', 'email'
      message TEXT,
      status TEXT DEFAULT 'New', -- 'New', 'Contacted', 'Follow-up Required', 'Interested', 'Counselling Scheduled', 'Admission Confirmed', 'Not Interested', 'Closed'
      source TEXT DEFAULT 'Website Form',
      counsellor_id INTEGER,
      next_followup_date DATETIME,
      consent_given INTEGER DEFAULT 1,
      is_demo INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE SET NULL,
      FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE SET NULL,
      FOREIGN KEY (counsellor_id) REFERENCES counsellors(id) ON DELETE SET NULL
    );

    -- 6. Follow-ups
    CREATE TABLE IF NOT EXISTS follow_ups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      enquiry_id INTEGER NOT NULL,
      counsellor_id INTEGER,
      scheduled_date DATETIME NOT NULL,
      notes TEXT,
      status TEXT DEFAULT 'Pending', -- 'Pending', 'Completed', 'Cancelled'
      completed_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (enquiry_id) REFERENCES enquiries(id) ON DELETE CASCADE,
      FOREIGN KEY (counsellor_id) REFERENCES counsellors(id) ON DELETE SET NULL
    );

    -- 7. Lead Notes
    CREATE TABLE IF NOT EXISTS lead_notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      enquiry_id INTEGER NOT NULL,
      author_name TEXT NOT NULL,
      note TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (enquiry_id) REFERENCES enquiries(id) ON DELETE CASCADE
    );

    -- 8. Faculty
    CREATE TABLE IF NOT EXISTS faculty (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      designation TEXT NOT NULL,
      subjects TEXT NOT NULL,
      bio TEXT NOT NULL,
      image_url TEXT NOT NULL,
      linkedin_url TEXT,
      twitter_url TEXT,
      is_published INTEGER DEFAULT 1,
      order_index INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 9. Toppers
    CREATE TABLE IF NOT EXISTS toppers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_name TEXT NOT NULL,
      exam_or_class TEXT NOT NULL,
      score_or_rank TEXT,
      year TEXT,
      image_url TEXT NOT NULL,
      is_published INTEGER DEFAULT 1,
      order_index INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 10. Testimonials
    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      author_name TEXT NOT NULL,
      author_relation TEXT NOT NULL, -- e.g. 'Parent of Class 10 Student', 'Parent of Class 12 Topper'
      quote TEXT NOT NULL,
      rating INTEGER DEFAULT 5,
      is_published INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 11. Gallery
    CREATE TABLE IF NOT EXISTS gallery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL, -- 'Classrooms', 'Faculty', 'Achievements', 'Activities'
      image_url TEXT NOT NULL,
      description TEXT,
      is_published INTEGER DEFAULT 1,
      order_index INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 12. Website Settings
    CREATE TABLE IF NOT EXISTS website_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 13. Notifications
    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      type TEXT DEFAULT 'info', -- 'lead', 'follow_up', 'system', 'info'
      is_read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 14. Audit Logs
    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_name TEXT NOT NULL,
      action TEXT NOT NULL,
      target_type TEXT NOT NULL,
      target_id TEXT,
      details TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Performance Indexes
    CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
    CREATE INDEX IF NOT EXISTS idx_enquiries_course ON enquiries(course_id);
    CREATE INDEX IF NOT EXISTS idx_enquiries_branch ON enquiries(branch_id);
    CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries(created_at);
    CREATE INDEX IF NOT EXISTS idx_followups_scheduled ON follow_ups(scheduled_date, status);
  `);
}
