import processImage from '../utilities/imageProcessor';
import fs from 'fs';
import path from 'path';

describe('imageProcessor utility', () => {
  const outputPath = path.join(process.cwd(), 'thumb', 'fjord_100x100.jpg');

  // Clean up the test output file before each test
  beforeEach(() => {
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }
  });

  it('should resize an image and save it to thumb/', async () => {
    const result = await processImage('fjord', 100, 100);
    expect(fs.existsSync(result)).toBeTrue();
  });

  it('should return cached image on second call', async () => {
    await processImage('fjord', 100, 100); // first call creates it
    const result = await processImage('fjord', 100, 100); // second call returns cached
    expect(fs.existsSync(result)).toBeTrue();
  });

  it('should throw error for non-existent image', async () => {
    await expectAsync(
      processImage('doesnotexist', 100, 100)
    ).toBeRejectedWithError('Image "doesnotexist" not found');
  });
});
