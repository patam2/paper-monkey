import request from 'supertest';
import app from '../src/app'; 

import { expect, test } from 'vitest'

test('GET /newsletter/ without user cookie should return status 403', async () => {
    const response = await request(app).get('/newsletter/38');
    expect(response.status).toBe(403);
});

test('GET /newsletter/all with admin account should return all', async () => {
    const response = await request(app).get('/newsletter/all').set("cookie", "user=9NbMXqeGfeRbG6PEonqjNpHhcoNqGhWKn0o93ABE5PPlhsz31QFFaTVsbfNpkptO")
    console.log(response.body)
    expect(response.text).toContain("newsletters")
})

test('GET /newsletter/all with an invalid cookie should return status 403', async () => {
    const response = await request(app).get('/newsletter/all').set("cookie", "invalidCookie")
    expect(response.status).toBe(403)
})