const request = require('supertest');
const createAppExpress = require('../../../src/apps/api/app');
const app = createAppExpress();

describe('healthRouter', () => {
    test('should return 200 from /GET /api/health', async () => {
        const response = await request(app).get('/api/health');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain("I'am live");
    });    
});
