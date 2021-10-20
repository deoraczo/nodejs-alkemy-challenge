const request = require('supertest');
const app = require('../../../src/apps/api/app');

describe('healthRouter', () => {
    test('should return 200 from /GET /api/health', async () => {
        const response = await request(app).get('/api/health');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('Hello, Wordl!');
    });    
});
