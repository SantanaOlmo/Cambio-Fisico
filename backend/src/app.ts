import express from 'express';
import cors from 'cors';
import entriesRoutes from './routes/entriesRoutes';
import photosRoutes from './routes/photosRoutes';
import uploadRoutes from './routes/uploadRoutes';
import exportRoutes from './routes/exportRoutes';
import recipesRoutes from './routes/recipesRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:4173',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
);

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/entries', entriesRoutes);
app.use('/api/photos', photosRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/recipes', recipesRoutes);

// Global error handler — must be registered last
app.use(errorHandler);

export default app;
