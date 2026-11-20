import { Router, Request, Response } from 'express';
import { db } from '../db/database';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// GET /api/courses - Public list
router.get('/', (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM courses WHERE is_published = 1';
    const params: any[] = [];

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    query += ' ORDER BY order_index ASC, id ASC';
    const courses = db.prepare(query).all(...params) as any[];

    // Parse highlights JSON
    const parsed = courses.map(c => ({
      ...c,
      highlights: c.highlights ? JSON.parse(c.highlights) : []
    }));

    res.json({ courses: parsed });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/courses/:slug - Public single course
router.get('/:slug', (req: Request, res: Response) => {
  try {
    const course = db.prepare('SELECT * FROM courses WHERE slug = ?').get(req.params.slug) as any;
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    course.highlights = course.highlights ? JSON.parse(course.highlights) : [];
    res.json({ course });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/courses - Admin create course
router.post('/', requireAuth, (req: AuthRequest, res: Response) => {
  const {
    slug,
    title,
    category,
    target_audience,
    short_description,
    full_description,
    eligibility,
    duration,
    highlights,
    icon = 'BookOpen',
    order_index = 0
  } = req.body;

  if (!title || !slug || !short_description || !full_description) {
    return res.status(400).json({ error: 'Missing required course fields' });
  }

  try {
    const insert = db.prepare(`
      INSERT INTO courses (
        slug, title, category, target_audience, short_description, full_description,
        eligibility, duration, highlights, icon, order_index, is_published
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
    `);

    const result = insert.run(
      slug,
      title,
      category || 'School Education',
      target_audience || null,
      short_description,
      full_description,
      eligibility || null,
      duration || null,
      Array.isArray(highlights) ? JSON.stringify(highlights) : '[]',
      icon,
      order_index
    );

    res.status(201).json({ message: 'Course created successfully', id: result.lastInsertRowid });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/courses/:id - Admin update course
router.put('/:id', requireAuth, (req: AuthRequest, res: Response) => {
  const {
    slug,
    title,
    category,
    target_audience,
    short_description,
    full_description,
    eligibility,
    duration,
    highlights,
    icon,
    is_published,
    order_index
  } = req.body;

  try {
    db.prepare(`
      UPDATE courses SET
        slug = COALESCE(?, slug),
        title = COALESCE(?, title),
        category = COALESCE(?, category),
        target_audience = COALESCE(?, target_audience),
        short_description = COALESCE(?, short_description),
        full_description = COALESCE(?, full_description),
        eligibility = COALESCE(?, eligibility),
        duration = COALESCE(?, duration),
        highlights = COALESCE(?, highlights),
        icon = COALESCE(?, icon),
        is_published = COALESCE(?, is_published),
        order_index = COALESCE(?, order_index)
      WHERE id = ?
    `).run(
      slug,
      title,
      category,
      target_audience,
      short_description,
      full_description,
      eligibility,
      duration,
      highlights ? JSON.stringify(highlights) : null,
      icon,
      is_published,
      order_index,
      req.params.id
    );

    res.json({ message: 'Course updated successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/courses/:id - Admin archive/delete
router.delete('/:id', requireAuth, (req: AuthRequest, res: Response) => {
  try {
    db.prepare('DELETE FROM courses WHERE id = ?').run(req.params.id);
    res.json({ message: 'Course deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
