import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { seedDatabase } from './db/seed';

// Routes
import authRoutes from './routes/auth';
import enquiryRoutes from './routes/enquiries';
import courseRoutes from './routes/courses';
import facultyRoutes from './routes/faculty';
import topperRoutes from './routes/toppers';
import testimonialRoutes from './routes/testimonials';
import branchRoutes from './routes/branches';
import galleryRoutes from './routes/gallery';
import settingRoutes from './routes/settings';
import analyticsRoutes from './routes/analytics';
import demoRoutes from './routes/demo';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets
const publicAssetsPath = path.resolve(__dirname, '../../client/public/assets');
app.use('/assets', express.static(publicAssetsPath));

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    institute: 'Ideal Career Institute',
    partner: 'AlgoForce AI',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/toppers', topperRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/demo', demoRoutes);

// Serve Frontend client build if available
const clientDistPath = path.resolve(__dirname, '../../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/assets')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('[Server Error]:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server and Initialize Database
seedDatabase();

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` Ideal Career Institute Platform & Admission CRM`);
  console.log(` Production & API Port: http://localhost:${PORT}`);
  console.log(` Technology Partner: AlgoForce AI`);
  console.log(`====================================================`);
});
