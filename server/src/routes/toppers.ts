import { Router, Request, Response } from 'express';
import { db } from '../db/database';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// GET /api/toppers - Public list
router.get('/', (req: Request, res: Response) => {
  try {
    const toppers = db.prepare('SELECT * FROM toppers WHERE is_published = 1 ORDER BY order_index ASC, id ASC').all();
    res.json({ toppers });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/toppers - Admin create
router.post('/', requireAuth, (req: AuthRequest, res: Response) => {
  const { student_name, exam_or_class, score_or_rank, year, image_url, order_index = 0 } = req.body;
  if (!student_name || !image_url) {
    return res.status(400).json({ error: 'Student name and image are required' });
  }

  try {
    const result = db.prepare(`
      INSERT INTO toppers (student_name, exam_or_class, score_or_rank, year, image_url, order_index, is_published)
      VALUES (?, ?, ?, ?, ?, ?, 1)
    `).run(student_name, exam_or_class || 'Board Exam Achiever', score_or_rank || 'Top Merit', year || 'Verified Alumnus', image_url, order_index);

    res.status(201).json({ message: 'Topper added', id: result.lastInsertRowid });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/toppers/:id - Admin update
router.put('/:id', requireAuth, (req: AuthRequest, res: Response) => {
  const { student_name, exam_or_class, score_or_rank, year, image_url, order_index, is_published } = req.body;
  try {
    db.prepare(`
      UPDATE toppers SET
        student_name = COALESCE(?, student_name),
        exam_or_class = COALESCE(?, exam_or_class),
        score_or_rank = COALESCE(?, score_or_rank),
        year = COALESCE(?, year),
        image_url = COALESCE(?, image_url),
        order_index = COALESCE(?, order_index),
        is_published = COALESCE(?, is_published)
      WHERE id = ?
    `).run(student_name, exam_or_class, score_or_rank, year, image_url, order_index, is_published, req.params.id);

    res.json({ message: 'Topper updated successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/toppers/:id
router.delete('/:id', requireAuth, (req: AuthRequest, res: Response) => {
  try {
    db.prepare('DELETE FROM toppers WHERE id = ?').run(req.params.id);
    res.json({ message: 'Topper deleted' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
