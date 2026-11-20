import { Router, Request, Response } from 'express';
import { db } from '../db/database';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// GET /api/gallery - Public list
router.get('/', (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM gallery WHERE is_published = 1';
    const params: any[] = [];
    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    query += ' ORDER BY order_index ASC, id ASC';
    const items = db.prepare(query).all(...params);
    res.json({ gallery: items });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/gallery - Admin add photo
router.post('/', requireAuth, (req: AuthRequest, res: Response) => {
  const { title, category, image_url, description, order_index = 0 } = req.body;
  if (!title || !image_url) {
    return res.status(400).json({ error: 'Title and image are required' });
  }

  try {
    const result = db.prepare(`
      INSERT INTO gallery (title, category, image_url, description, order_index, is_published)
      VALUES (?, ?, ?, ?, ?, 1)
    `).run(title, category || 'Classrooms', image_url, description || '', order_index);

    res.status(201).json({ message: 'Gallery item added', id: result.lastInsertRowid });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/gallery/:id
router.delete('/:id', requireAuth, (req: AuthRequest, res: Response) => {
  try {
    db.prepare('DELETE FROM gallery WHERE id = ?').run(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
