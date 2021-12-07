import supertest from 'supertest';
import getFilteringStr from '../index';

const request = supertest('https://jsonplaceholder.typicode.com');
const id1 = 7;
const id2 = 2;
const title = 'voluptatem laborum magni';

describe('Smoke test of filtering request', () => {
  it('has status OK', async () => {
    const response1 = await request.get(getFilteringStr(id1, title));
    const response2 = await request.get(getFilteringStr(id2, title));
    expect(response1.status).toBe(200);
    expect(response2.status).toBe(200);
  });
  it('has not empty body', async () => {
    const response = await request.get(getFilteringStr(id1, title));
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body).toHaveLength(1);
  });
  it('has empty body', async () => {
    const response = await request.get(getFilteringStr(id2, title));
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body).toHaveLength(0);
  });
});
