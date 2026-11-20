import { Router, Request, Response } from 'express';
import { db } from '../db/database';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// GET /api/analytics - Real database-backed admission analytics
router.get('/', requireAuth, (req: AuthRequest, res: Response) => {
  const { start_date, end_date, include_demo = 'true' } = req.query;

  try {
    let whereClause = 'WHERE 1=1';
    const params: any[] = [];

    if (include_demo === 'false' || include_demo === '0') {
      whereClause += ' AND is_demo = 0';
    }

    if (start_date) {
      whereClause += ' AND date(created_at) >= date(?)';
      params.push(start_date);
    }
    if (end_date) {
      whereClause += ' AND date(created_at) <= date(?)';
      params.push(end_date);
    }

    // 1. KPI Counts
    const totalLeads = (db.prepare(`SELECT COUNT(*) as count FROM enquiries ${whereClause}`).get(...params) as any).count;
    const newLeads = (db.prepare(`SELECT COUNT(*) as count FROM enquiries ${whereClause} AND status = 'New'`).get(...params) as any).count;
    const contactedLeads = (db.prepare(`SELECT COUNT(*) as count FROM enquiries ${whereClause} AND status = 'Contacted'`).get(...params) as any).count;
    const followUpPending = (db.prepare(`SELECT COUNT(*) as count FROM enquiries ${whereClause} AND status = 'Follow-up Required'`).get(...params) as any).count;
    const interestedLeads = (db.prepare(`SELECT COUNT(*) as count FROM enquiries ${whereClause} AND status = 'Interested'`).get(...params) as any).count;
    const scheduledLeads = (db.prepare(`SELECT COUNT(*) as count FROM enquiries ${whereClause} AND status = 'Counselling Scheduled'`).get(...params) as any).count;
    const confirmedAdmissions = (db.prepare(`SELECT COUNT(*) as count FROM enquiries ${whereClause} AND status = 'Admission Confirmed'`).get(...params) as any).count;
    const closedOrNotInterested = (db.prepare(`SELECT COUNT(*) as count FROM enquiries ${whereClause} AND status IN ('Not Interested', 'Closed')`).get(...params) as any).count;

    // Conversion rate: Confirmed Admissions ÷ Total Enquiries * 100
    const conversionRate = totalLeads > 0 ? Number(((confirmedAdmissions / totalLeads) * 100).toFixed(1)) : 0;

    // 2. Status Distribution Pipeline
    const statusDistribution = db.prepare(`
      SELECT status, COUNT(*) as count
      FROM enquiries
      ${whereClause}
      GROUP BY status
      ORDER BY count DESC
    `).all(...params);

    // 3. Course Distribution
    const courseDistribution = db.prepare(`
      SELECT COALESCE(c.title, 'General Enquiry') as course_name, COUNT(e.id) as count
      FROM enquiries e
      LEFT JOIN courses c ON e.course_id = c.id
      ${whereClause.replace(/created_at/g, 'e.created_at').replace(/is_demo/g, 'e.is_demo')}
      GROUP BY course_name
      ORDER BY count DESC
    `).all(...params);

    // 4. Branch Distribution
    const branchDistribution = db.prepare(`
      SELECT COALESCE(b.name, 'Unassigned Branch') as branch_name, COUNT(e.id) as count
      FROM enquiries e
      LEFT JOIN branches b ON e.branch_id = b.id
      ${whereClause.replace(/created_at/g, 'e.created_at').replace(/is_demo/g, 'e.is_demo')}
      GROUP BY branch_name
      ORDER BY count DESC
    `).all(...params);

    // 5. Recent 7-Day Trend
    const recentTrend = db.prepare(`
      SELECT date(created_at) as date, COUNT(*) as count
      FROM enquiries
      ${whereClause}
      GROUP BY date(created_at)
      ORDER BY date ASC
      LIMIT 14
    `).all(...params);

    // 6. Follow-up summary
    const pendingFollowUps = (db.prepare(`
      SELECT COUNT(*) as count FROM follow_ups WHERE status = 'Pending'
    `).get() as any).count;

    const overdueFollowUps = (db.prepare(`
      SELECT COUNT(*) as count FROM follow_ups WHERE status = 'Pending' AND date(scheduled_date) < date('now')
    `).get() as any).count;

    res.json({
      summary: {
        totalLeads,
        newLeads,
        contactedLeads,
        followUpPending,
        interestedLeads,
        scheduledLeads,
        confirmedAdmissions,
        closedOrNotInterested,
        conversionRate,
        pendingFollowUps,
        overdueFollowUps
      },
      statusDistribution,
      courseDistribution,
      branchDistribution,
      recentTrend
    });
  } catch (err: any) {
    console.error('Analytics error:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
