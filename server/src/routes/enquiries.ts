import { Router, Request, Response } from 'express';
import { db } from '../db/database';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { generateWhatsAppLink } from '../services/whatsapp';
import { syncLeadToSupabase } from '../services/supabaseClient';

const router = Router();

// Helper to generate unique enquiry ID
function generateEnquiryId(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `ICI-${year}-${random}`;
}

// Helper to validate Indian mobile numbers
function isValidIndianMobile(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  // Match 10 digits starting with 6, 7, 8, or 9 (or with leading 91)
  if (cleaned.length === 10 && /^[6-9]\d{9}$/.test(cleaned)) return true;
  if (cleaned.length === 12 && cleaned.startsWith('91') && /^91[6-9]\d{9}$/.test(cleaned)) return true;
  return false;
}

// POST /api/enquiries - Public Student Enquiry Submission
router.post('/', (req: Request, res: Response) => {
  const {
    student_name,
    phone,
    email,
    current_class,
    course_id,
    branch_id,
    contact_method = 'phone',
    message,
    consent_given = true,
    source = 'Website Form'
  } = req.body;

  // Validation
  if (!student_name || typeof student_name !== 'string' || student_name.trim().length < 2) {
    return res.status(400).json({ error: 'Please enter a valid student name (minimum 2 characters).' });
  }

  if (!phone || !isValidIndianMobile(phone)) {
    return res.status(400).json({ error: 'Please provide a valid 10-digit Indian mobile number.' });
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const cleanPhone = phone.replace(/\D/g, '').slice(-10);

  // Duplicate submission protection within 5 minutes
  const recentDuplicate = db.prepare(`
    SELECT id, enquiry_id FROM enquiries
    WHERE phone LIKE ? AND course_id = ? AND datetime(created_at, '+5 minutes') > datetime('now')
  `).get(`%${cleanPhone}%`, course_id || null) as any;

  if (recentDuplicate) {
    return res.status(429).json({
      error: `An enquiry with this phone number was already received recently. Your Enquiry Reference ID is ${recentDuplicate.enquiry_id}. Our team is already processing it.`
    });
  }

  const enquiryId = generateEnquiryId();

  try {
    const insert = db.prepare(`
      INSERT INTO enquiries (
        enquiry_id, student_name, phone, email, current_class, course_id, branch_id,
        contact_method, message, consent_given, status, source
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'New', ?)
    `);

    const result = insert.run(
      enquiryId,
      student_name.trim(),
      cleanPhone,
      email ? email.trim() : null,
      current_class || 'Not Specified',
      course_id || null,
      branch_id || null,
      contact_method,
      message ? message.trim() : null,
      consent_given ? 1 : 0,
      source
    );

    // Fetch course details if selected to generate course-specific WhatsApp link
    let courseName = '';
    if (course_id) {
      const course = db.prepare('SELECT title FROM courses WHERE id = ?').get(course_id) as any;
      if (course) courseName = course.title;
    }

    // Generate WhatsApp direct chat link
    const waLink = generateWhatsAppLink({
      courseName,
      studentName: student_name.trim(),
      customMessage: `Hello Ideal Career Institute, my enquiry ID is ${enquiryId}. I have submitted an admission enquiry for ${courseName || 'courses'}. Please share the admission details.`
    });

    // Create admin notification
    db.prepare(`
      INSERT INTO notifications (title, message, type)
      VALUES (?, ?, 'lead')
    `).run(
      `New Admission Enquiry: ${student_name.trim()}`,
      `Received enquiry (${enquiryId}) for ${courseName || 'General Enquiry'} from phone +91 ${cleanPhone}.`
    );

    // Sync to Supabase in background if configured
    syncLeadToSupabase({
      enquiry_id: enquiryId,
      student_name: student_name.trim(),
      phone: cleanPhone,
      email,
      course_id,
      branch_id,
      status: 'New'
    }).catch(e => console.error('Supabase sync error:', e));

    return res.status(201).json({
      success: true,
      enquiry_id: enquiryId,
      message: 'Thank you for contacting Ideal Career Institute. Your enquiry has been received successfully. Our admission team will contact you shortly.',
      whatsapp_link: waLink
    });
  } catch (err: any) {
    console.error('Error saving enquiry:', err);
    return res.status(500).json({ error: 'Database submission failed. Please try again or call us directly at +91 7011667297.' });
  }
});

// GET /api/enquiries - Admin Lead Management (Protected)
router.get('/', requireAuth, (req: AuthRequest, res: Response) => {
  const {
    status,
    course_id,
    branch_id,
    counsellor_id,
    search,
    start_date,
    end_date,
    is_demo,
    limit = 100,
    offset = 0
  } = req.query;

  try {
    let query = `
      SELECT e.*, c.title as course_title, b.name as branch_name, cn.name as counsellor_name
      FROM enquiries e
      LEFT JOIN courses c ON e.course_id = c.id
      LEFT JOIN branches b ON e.branch_id = b.id
      LEFT JOIN counsellors cn ON e.counsellor_id = cn.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (is_demo !== undefined) {
      query += ` AND e.is_demo = ?`;
      params.push(is_demo === 'true' || is_demo === '1' ? 1 : 0);
    }

    if (status) {
      query += ` AND e.status = ?`;
      params.push(status);
    }

    if (course_id) {
      query += ` AND e.course_id = ?`;
      params.push(course_id);
    }

    if (branch_id) {
      query += ` AND e.branch_id = ?`;
      params.push(branch_id);
    }

    if (counsellor_id) {
      query += ` AND e.counsellor_id = ?`;
      params.push(counsellor_id);
    }

    if (start_date) {
      query += ` AND date(e.created_at) >= date(?)`;
      params.push(start_date);
    }

    if (end_date) {
      query += ` AND date(e.created_at) <= date(?)`;
      params.push(end_date);
    }

    if (search) {
      query += ` AND (e.student_name LIKE ? OR e.phone LIKE ? OR e.enquiry_id LIKE ?)`;
      const s = `%${search}%`;
      params.push(s, s, s);
    }

    query += ` ORDER BY e.created_at DESC LIMIT ? OFFSET ?`;
    params.push(Number(limit), Number(offset));

    const enquiries = db.prepare(query).all(...params);

    // Get total count for pagination
    let countQuery = `SELECT COUNT(*) as total FROM enquiries e WHERE 1=1`;
    const countParams = params.slice(0, -2);
    // re-build count query
    // Simplified count
    const totalCount = (db.prepare('SELECT COUNT(*) as total FROM enquiries').get() as any).total;

    res.json({ enquiries, total: totalCount });
  } catch (err: any) {
    console.error('Error fetching leads:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/enquiries/:id - Single Lead Details with Notes & Follow-ups
router.get('/:id', requireAuth, (req: AuthRequest, res: Response) => {
  try {
    const lead = db.prepare(`
      SELECT e.*, c.title as course_title, b.name as branch_name, cn.name as counsellor_name
      FROM enquiries e
      LEFT JOIN courses c ON e.course_id = c.id
      LEFT JOIN branches b ON e.branch_id = b.id
      LEFT JOIN counsellors cn ON e.counsellor_id = cn.id
      WHERE e.id = ? OR e.enquiry_id = ?
    `).get(req.params.id, req.params.id) as any;

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    const notes = db.prepare(`
      SELECT * FROM lead_notes WHERE enquiry_id = ? ORDER BY created_at DESC
    `).all(lead.id);

    const followUps = db.prepare(`
      SELECT f.*, cn.name as counsellor_name
      FROM follow_ups f
      LEFT JOIN counsellors cn ON f.counsellor_id = cn.id
      WHERE f.enquiry_id = ?
      ORDER BY f.scheduled_date DESC
    `).all(lead.id);

    res.json({ lead, notes, followUps });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/enquiries/:id/status - Update Lead Status
router.patch('/:id/status', requireAuth, (req: AuthRequest, res: Response) => {
  const { status, note } = req.body;
  const validStatuses = [
    'New',
    'Contacted',
    'Follow-up Required',
    'Interested',
    'Counselling Scheduled',
    'Admission Confirmed',
    'Not Interested',
    'Closed'
  ];

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status provided' });
  }

  try {
    const lead = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(req.params.id) as any;
    if (!lead) return res.status(404).json({ error: 'Lead not found' });

    db.prepare(`
      UPDATE enquiries
      SET status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(status, lead.id);

    // Optional note recording
    if (note) {
      db.prepare(`
        INSERT INTO lead_notes (enquiry_id, author_name, note)
        VALUES (?, ?, ?)
      `).run(lead.id, req.user?.username || 'Admin', note);
    }

    // Audit log
    db.prepare(`
      INSERT INTO audit_logs (user_name, action, target_type, target_id, details)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      req.user?.username || 'Admin',
      'STATUS_CHANGE',
      'ENQUIRY',
      String(lead.id),
      `Status changed from "${lead.status}" to "${status}". Note: ${note || 'None'}`
    );

    res.json({ message: 'Status updated successfully', status });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/enquiries/:id/assign - Assign Counsellor
router.patch('/:id/assign', requireAuth, (req: AuthRequest, res: Response) => {
  const { counsellor_id } = req.body;

  try {
    const lead = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(req.params.id) as any;
    if (!lead) return res.status(404).json({ error: 'Lead not found' });

    db.prepare(`
      UPDATE enquiries
      SET counsellor_id = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(counsellor_id || null, lead.id);

    let counsellorName = 'Unassigned';
    if (counsellor_id) {
      const c = db.prepare('SELECT name FROM counsellors WHERE id = ?').get(counsellor_id) as any;
      if (c) counsellorName = c.name;
    }

    db.prepare(`
      INSERT INTO audit_logs (user_name, action, target_type, target_id, details)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      req.user?.username || 'Admin',
      'ASSIGN_COUNSELLOR',
      'ENQUIRY',
      String(lead.id),
      `Assigned counsellor to: ${counsellorName}`
    );

    res.json({ message: 'Counsellor assigned successfully', counsellor_id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/enquiries/:id/notes - Add Internal Note
router.post('/:id/notes', requireAuth, (req: AuthRequest, res: Response) => {
  const { note } = req.body;
  if (!note || !note.trim()) {
    return res.status(400).json({ error: 'Note content is required' });
  }

  try {
    const lead = db.prepare('SELECT id FROM enquiries WHERE id = ?').get(req.params.id) as any;
    if (!lead) return res.status(404).json({ error: 'Lead not found' });

    db.prepare(`
      INSERT INTO lead_notes (enquiry_id, author_name, note)
      VALUES (?, ?, ?)
    `).run(lead.id, req.user?.username || 'Admin', note.trim());

    res.status(201).json({ message: 'Note added successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/enquiries/:id/followups - Schedule Follow-up
router.post('/:id/followups', requireAuth, (req: AuthRequest, res: Response) => {
  const { scheduled_date, notes, counsellor_id } = req.body;

  if (!scheduled_date) {
    return res.status(400).json({ error: 'Scheduled follow-up date is required' });
  }

  try {
    const lead = db.prepare('SELECT id FROM enquiries WHERE id = ?').get(req.params.id) as any;
    if (!lead) return res.status(404).json({ error: 'Lead not found' });

    db.prepare(`
      INSERT INTO follow_ups (enquiry_id, counsellor_id, scheduled_date, notes, status)
      VALUES (?, ?, ?, ?, 'Pending')
    `).run(lead.id, counsellor_id || null, scheduled_date, notes || null);

    // Also update lead's next_followup_date
    db.prepare(`
      UPDATE enquiries
      SET next_followup_date = ?, status = CASE WHEN status = 'New' THEN 'Follow-up Required' ELSE status END
      WHERE id = ?
    `).run(scheduled_date, lead.id);

    res.status(201).json({ message: 'Follow-up scheduled successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/enquiries/export/csv - Export Leads to CSV
router.get('/export/csv', requireAuth, (req: AuthRequest, res: Response) => {
  try {
    const leads = db.prepare(`
      SELECT e.enquiry_id, e.student_name, e.phone, e.email, e.current_class,
             c.title as course, b.name as branch, e.contact_method, e.status,
             e.source, cn.name as counsellor, e.next_followup_date, e.created_at
      FROM enquiries e
      LEFT JOIN courses c ON e.course_id = c.id
      LEFT JOIN branches b ON e.branch_id = b.id
      LEFT JOIN counsellors cn ON e.counsellor_id = cn.id
      ORDER BY e.created_at DESC
    `).all() as any[];

    const headers = [
      'Enquiry ID',
      'Student Name',
      'Phone',
      'Email',
      'Class/Qualification',
      'Course',
      'Branch',
      'Preferred Contact',
      'Status',
      'Source',
      'Counsellor',
      'Next Follow-up',
      'Submission Date'
    ];

    const escapeCsv = (val: any) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    let csvContent = headers.join(',') + '\n';
    for (const row of leads) {
      csvContent += [
        escapeCsv(row.enquiry_id),
        escapeCsv(row.student_name),
        escapeCsv(row.phone),
        escapeCsv(row.email),
        escapeCsv(row.current_class),
        escapeCsv(row.course),
        escapeCsv(row.branch),
        escapeCsv(row.contact_method),
        escapeCsv(row.status),
        escapeCsv(row.source),
        escapeCsv(row.counsellor),
        escapeCsv(row.next_followup_date),
        escapeCsv(row.created_at)
      ].join(',') + '\n';
    }

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="ideal_career_institute_leads.csv"');
    res.send(csvContent);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
