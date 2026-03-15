import express, { Application, Request, Response } from 'express';
import imagesRouter from './routes/api/images';

const app: Application = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/images', imagesRouter);

// Health check
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Image Processing API is running');
});

export default app;
// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
