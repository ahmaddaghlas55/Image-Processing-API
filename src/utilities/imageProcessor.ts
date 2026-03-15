import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const inputDir = path.join(__dirname, '../../../images');
const outputDir = path.join(__dirname, '../../../thumb');

const processImage = async (
  filename: string,
  width: number,
  height: number
): Promise<string> => {
  const inputPath = path.join(inputDir, `${filename}.jpg`);
  const outputPath = path.join(outputDir, `${filename}_${width}x${height}.jpg`);

  // Check if source image exists
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Image "${filename}" not found`);
  }

  // Return cached version if it already exists
  if (fs.existsSync(outputPath)) {
    return outputPath;
  }

  // Process and save
  await sharp(inputPath).resize(width, height).toFile(outputPath);
  return outputPath;
};

export default processImage;
