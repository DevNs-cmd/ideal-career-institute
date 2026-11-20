import { Router, Request, Response } from 'express';
import { db } from '../db/database';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// POST /api/demo/seed - Load demonstration dataset for management meeting
router.post('/seed', requireAuth, (req: AuthRequest, res: Response) => {
  try {
    // Clear existing demo records first
    db.prepare('DELETE FROM follow_ups WHERE enquiry_id IN (SELECT id FROM enquiries WHERE is_demo = 1)').run();
    db.prepare('DELETE FROM lead_notes WHERE enquiry_id IN (SELECT id FROM enquiries WHERE is_demo = 1)').run();
    db.prepare('DELETE FROM enquiries WHERE is_demo = 1').run();

    const courses = db.prepare('SELECT id, title FROM courses LIMIT 5').all() as any[];
    const branch = db.prepare('SELECT id FROM branches WHERE is_verified = 1 LIMIT 1').get() as any;
    const counsellor = db.prepare('SELECT id, name FROM counsellors LIMIT 1').get() as any;

    const branchId = branch ? branch.id : 1;
    const counsellorId = counsellor ? counsellor.id : 1;
    const counsellorName = counsellor ? counsellor.name : 'Senior Admission Counsellor';

    const insertEnquiry = db.prepare(`
      INSERT INTO enquiries (
        enquiry_id, student_name, phone, email, current_class, course_id, branch_id,
        contact_method, message, status, source, counsellor_id, next_followup_date, is_demo, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Executive Demo', ?, ?, 1, datetime('now', ?))
    `);

    const insertNote = db.prepare(`
      INSERT INTO lead_notes (enquiry_id, author_name, note, created_at)
      VALUES (?, ?, ?, datetime('now', ?))
    `);

    const insertFollowUp = db.prepare(`
      INSERT INTO follow_ups (enquiry_id, counsellor_id, scheduled_date, notes, status, created_at)
      VALUES (?, ?, ?, ?, ?, datetime('now', ?))
    `);

    // Sample Lead 1: Admission Confirmed
    const id1 = 'ICI-DEMO-101';
    const r1 = insertEnquiry.run(
      id1, '[DEMO] Rohan Sharma', '9876543210', 'rohan.demo@gmail.com', 'Class 12',
      courses[1]?.id || 2, branchId, 'phone', 'Enquiring for Commerce with Maths batch starting next week.',
      'Admission Confirmed', counsellorId, null, '-3 days'
    );
    const rowId1 = r1.lastInsertRowid;
    insertNote.run(rowId1, counsellorName, 'Spoke with student and parent. Discussed batch schedule and fee breakdown. Parent visited Madangir branch.', '-2 days');
    insertNote.run(rowId1, counsellorName, 'Registration completed. Admission confirmed for Commerce Class 12 batch.', '-1 days');

    // Sample Lead 2: Counselling Scheduled
    const id2 = 'ICI-DEMO-102';
    const r2 = insertEnquiry.run(
      id2, '[DEMO] Priya Verma', '9812345678', 'priya.demo@gmail.com', 'Class 11',
      courses[5]?.id || 6, branchId, 'whatsapp', 'Interested in 2-year integrated JEE/NEET classroom batch.',
      'Counselling Scheduled', counsellorId, '2026-11-25 15:00:00', '-2 days'
    );
    const rowId2 = r2.lastInsertRowid;
    insertNote.run(rowId2, counsellorName, 'Shared syllabus brochure via WhatsApp. Scheduled personal campus counselling session.', '-1 days');
    insertFollowUp.run(rowId2, counsellorId, '2026-11-25 15:00:00', 'In-person academic counselling session with faculty head.', 'Pending', '-1 days');

    // Sample Lead 3: Follow-up Required
    const id3 = 'ICI-DEMO-103';
    const r3 = insertEnquiry.run(
      id3, '[DEMO] Aman Kapoor', '9988776655', 'aman.demo@yahoo.com', 'Graduate',
      courses[7]?.id || 8, branchId, 'phone', 'Looking for morning batch timings for SSC / Defence preparation.',
      'Follow-up Required', counsellorId, '2026-11-22 11:00:00', '-1 days'
    );
    const rowId3 = r3.lastInsertRowid;
    insertNote.run(rowId3, counsellorName, 'Called student. Requested follow-up call during morning hours to confirm batch timing.', '-1 days');
    insertFollowUp.run(rowId3, counsellorId, '2026-11-22 11:00:00', 'Call to confirm morning 9 AM batch slot.', 'Pending', '-1 days');

    // Sample Lead 4: New Enquiry (freshly arrived)
    const id4 = 'ICI-DEMO-104';
    insertEnquiry.run(
      id4, '[DEMO] Sneha Patel', '9711223344', 'sneha.demo@outlook.com', 'Class 10',
      courses[0]?.id || 1, branchId, 'phone', 'Need Maths and Science board preparation coaching with Arpit Sir.',
      'New', null, null, '0 days'
    );

    // Audit log
    db.prepare(`
      INSERT INTO audit_logs (user_name, action, target_type, target_id, details)
      VALUES (?, 'SEED_DEMO', 'DEMO_DATASET', 'ALL', 'Populated sample demonstration journey for management meeting')
    `).run(req.user?.username || 'Admin');

    res.json({
      success: true,
      message: 'Institutional demonstration dataset loaded successfully! 4 demo leads created across different stages of the admission journey.'
    });
  } catch (err: any) {
    console.error('Demo seed error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/demo/reset - Clear all demo records
router.post('/reset', requireAuth, (req: AuthRequest, res: Response) => {
  try {
    db.prepare('DELETE FROM follow_ups WHERE enquiry_id IN (SELECT id FROM enquiries WHERE is_demo = 1)').run();
    db.prepare('DELETE FROM lead_notes WHERE enquiry_id IN (SELECT id FROM enquiries WHERE is_demo = 1)').run();
    db.prepare('DELETE FROM enquiries WHERE is_demo = 1').run();

    db.prepare(`
      INSERT INTO audit_logs (user_name, action, target_type, target_id, details)
      VALUES (?, 'RESET_DEMO', 'DEMO_DATASET', 'ALL', 'Cleared all demonstration records')
    `).run(req.user?.username || 'Admin');

    res.json({
      success: true,
      message: 'All demo records removed successfully. Database contains only genuine records.'
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
