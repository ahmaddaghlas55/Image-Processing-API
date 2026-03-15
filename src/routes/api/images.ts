import { Router, Request, Response } from 'express';
import processImage from '../../utilities/imageProcessor';

const router = Router();

// GET /api/images?filename=fjord&width=300&height=200
router.get('/', async (req: Request, res: Response): Promise<void> => {
  const { filename, width, height } = req.query;

  // Validate presence
  if (!filename) {
    res.status(400).json({ error: 'Missing required parameter: filename' });
    return;
  }
  if (!width || !height) {
    res
      .status(400)
      .json({ error: 'Missing required parameters: width and height' });
    return;
  }

  // Validate types
  const w = parseInt(width as string, 10);
  const h = parseInt(height as string, 10);

  if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
    res
      .status(400)
      .json({ error: 'Width and height must be positive numbers' });
    return;
  }

  try {
    const outputPath = await processImage(filename as string, w, h);
    res.status(200).sendFile(outputPath);
  } catch (err) {
    if (err instanceof Error && err.message.includes('not found')) {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Image processing failed' });
    }
  }
});

export default router;
