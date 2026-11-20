import { Router, Request, Response } from 'express';
import { db } from '../db/database';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// GET /api/branches - Public: verified active branches only
router.get('/', (req: Request, res: Response) => {
  try {
    const branches = db.prepare('SELECT * FROM branches WHERE is_active = 1 AND is_verified = 1 ORDER BY id ASC').all();
    res.json({ branches });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/branches/all - Admin: all branches including unverified/draft
router.get('/all', requireAuth, (req: AuthRequest, res: Response) => {
  try {
    const branches = db.prepare('SELECT * FROM branches ORDER BY id ASC').all();
    res.json({ branches });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/branches - Admin create branch
router.post('/', requireAuth, (req: AuthRequest, res: Response) => {
  const { name, address, phone, timings, map_url, is_active = 1, is_verified = 0 } = req.body;
  if (!name || !address || !phone) {
    return res.status(400).json({ error: 'Name, address and phone are required' });
  }

  try {
    const result = db.prepare(`
      INSERT INTO branches (name, address, phone, timings, map_url, is_active, is_verified)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(name, address, phone, timings || 'Mon-Sat 9am-5pm', map_url || '', is_active ? 1 : 0, is_verified ? 1 : 0);

    res.status(201).json({ message: 'Branch created', id: result.lastInsertRowid });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/branches/:id - Admin update
router.put('/:id', requireAuth, (req: AuthRequest, res: Response) => {
  const { name, address, phone, timings, map_url, is_active, is_verified } = req.body;
  try {
    db.prepare(`
      UPDATE branches SET
        name = COALESCE(?, name),
        address = COALESCE(?, address),
        phone = COALESCE(?, phone),
        timings = COALESCE(?, timings),
        map_url = COALESCE(?, map_url),
        is_active = COALESCE(?, is_active),
        is_verified = COALESCE(?, is_verified)
      WHERE id = ?
    `).run(name, address, phone, timings, map_url, is_active, is_verified, req.params.id);

    res.json({ message: 'Branch updated successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
