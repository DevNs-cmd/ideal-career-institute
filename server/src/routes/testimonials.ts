import { Router, Request, Response } from 'express';
import { db } from '../db/database';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// GET /api/testimonials - Public list
router.get('/', (req: Request, res: Response) => {
  try {
    const testimonials = db.prepare('SELECT * FROM testimonials WHERE is_published = 1 ORDER BY created_at DESC').all();
    res.json({ testimonials });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/testimonials - Admin add genuine testimonial
router.post('/', requireAuth, (req: AuthRequest, res: Response) => {
  const { author_name, author_relation, quote, rating = 5 } = req.body;
  if (!author_name || !quote) {
    return res.status(400).json({ error: 'Author name and review quote are required' });
  }

  try {
    const result = db.prepare(`
      INSERT INTO testimonials (author_name, author_relation, quote, rating, is_published)
      VALUES (?, ?, ?, ?, 1)
    `).run(author_name, author_relation || 'Parent of Student', quote, rating);

    res.status(201).json({ message: 'Testimonial added successfully', id: result.lastInsertRowid });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/testimonials/:id - Admin update
router.put('/:id', requireAuth, (req: AuthRequest, res: Response) => {
  const { author_name, author_relation, quote, rating, is_published } = req.body;
  try {
    db.prepare(`
      UPDATE testimonials SET
        author_name = COALESCE(?, author_name),
        author_relation = COALESCE(?, author_relation),
        quote = COALESCE(?, quote),
        rating = COALESCE(?, rating),
        is_published = COALESCE(?, is_published)
      WHERE id = ?
    `).run(author_name, author_relation, quote, rating, is_published, req.params.id);

    res.json({ message: 'Testimonial updated' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/testimonials/:id
router.delete('/:id', requireAuth, (req: AuthRequest, res: Response) => {
  try {
    db.prepare('DELETE FROM testimonials WHERE id = ?').run(req.params.id);
    res.json({ message: 'Testimonial deleted' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
