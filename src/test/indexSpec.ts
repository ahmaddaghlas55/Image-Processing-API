import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('GET /api/images', () => {
  it('should return 200 and an image for valid params', async () => {
    const res = await request.get(
      '/api/images?filename=fjord&width=200&height=200'
    );
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('image');
  });

  it('should return 400 when filename is missing', async () => {
    const res = await request.get('/api/images?width=200&height=200');
    expect(res.status).toBe(400);
  });

  it('should return 400 when width is missing', async () => {
    const res = await request.get('/api/images?filename=fjord&height=200');
    expect(res.status).toBe(400);
  });

  it('should return 400 for invalid width value', async () => {
    const res = await request.get(
      '/api/images?filename=fjord&width=abc&height=200'
    );
    expect(res.status).toBe(400);
  });

  it('should return 404 for non-existent image', async () => {
    const res = await request.get(
      '/api/images?filename=doesnotexist&width=200&height=200'
    );
    expect(res.status).toBe(404);
  });
});
