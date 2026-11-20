import { Router, Request, Response } from 'express';
import { db } from '../db/database';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// GET /api/settings - Public website settings
router.get('/', (req: Request, res: Response) => {
  try {
    const rows = db.prepare('SELECT key, value FROM website_settings').all() as { key: string; value: string }[];
    const settings: Record<string, string> = {};
    for (const r of rows) {
      settings[r.key] = r.value;
    }
    res.json({ settings });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/settings - Admin update settings
router.put('/', requireAuth, (req: AuthRequest, res: Response) => {
  const updates: Record<string, string> = req.body;
  if (!updates || typeof updates !== 'object') {
    return res.status(400).json({ error: 'Settings object is required' });
  }

  try {
    const upsert = db.prepare(`
      INSERT INTO website_settings (key, value, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
    `);

    for (const [key, value] of Object.entries(updates)) {
      upsert.run(key, String(value));
    }

    db.prepare(`
      INSERT INTO audit_logs (user_name, action, target_type, target_id, details)
      VALUES (?, 'UPDATE_SETTINGS', 'WEBSITE_SETTINGS', 'ALL', 'Updated institute website settings')
    `).run(req.user?.username || 'Admin');

    res.json({ message: 'Settings updated successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/settings/notifications - Admin notifications
router.get('/notifications', requireAuth, (req: AuthRequest, res: Response) => {
  try {
    const notifications = db.prepare('SELECT * FROM notifications ORDER BY created_at DESC LIMIT 50').all();
    const unreadCount = (db.prepare('SELECT COUNT(*) as count FROM notifications WHERE is_read = 0').get() as any).count;
    res.json({ notifications, unreadCount });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/settings/notifications/mark-read - Mark all read
router.patch('/notifications/mark-read', requireAuth, (req: AuthRequest, res: Response) => {
  try {
    db.prepare('UPDATE notifications SET is_read = 1 WHERE is_read = 0').run();
    res.json({ message: 'Notifications marked as read' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/settings/audit-logs - Admin audit trail
router.get('/audit-logs', requireAuth, (req: AuthRequest, res: Response) => {
  try {
    const logs = db.prepare('SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT 100').all();
    res.json({ logs });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
