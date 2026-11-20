import { Router, Request, Response } from 'express';
import { db } from '../db/database';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// GET /api/faculty - Public list
router.get('/', (req: Request, res: Response) => {
  try {
    const faculty = db.prepare('SELECT * FROM faculty WHERE is_published = 1 ORDER BY order_index ASC, id ASC').all();
    res.json({ faculty });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/faculty - Admin create faculty
router.post('/', requireAuth, (req: AuthRequest, res: Response) => {
  const { name, designation, subjects, bio, image_url, linkedin_url, twitter_url, order_index = 0 } = req.body;
  if (!name || !designation || !subjects || !bio || !image_url) {
    return res.status(400).json({ error: 'Missing required faculty fields' });
  }

  try {
    const result = db.prepare(`
      INSERT INTO faculty (name, designation, subjects, bio, image_url, linkedin_url, twitter_url, order_index, is_published)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
    `).run(name, designation, subjects, bio, image_url, linkedin_url || '', twitter_url || '', order_index);

    res.status(201).json({ message: 'Faculty member added', id: result.lastInsertRowid });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/faculty/:id - Admin update
router.put('/:id', requireAuth, (req: AuthRequest, res: Response) => {
  const { name, designation, subjects, bio, image_url, linkedin_url, twitter_url, order_index, is_published } = req.body;
  try {
    db.prepare(`
      UPDATE faculty SET
        name = COALESCE(?, name),
        designation = COALESCE(?, designation),
        subjects = COALESCE(?, subjects),
        bio = COALESCE(?, bio),
        image_url = COALESCE(?, image_url),
        linkedin_url = COALESCE(?, linkedin_url),
        twitter_url = COALESCE(?, twitter_url),
        order_index = COALESCE(?, order_index),
        is_published = COALESCE(?, is_published)
      WHERE id = ?
    `).run(name, designation, subjects, bio, image_url, linkedin_url, twitter_url, order_index, is_published, req.params.id);

    res.json({ message: 'Faculty updated successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/faculty/:id
router.delete('/:id', requireAuth, (req: AuthRequest, res: Response) => {
  try {
    db.prepare('DELETE FROM faculty WHERE id = ?').run(req.params.id);
    res.json({ message: 'Faculty member removed' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
