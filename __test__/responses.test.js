import supertest from 'supertest';
import getFilteringStr from '../index';

const request = supertest('https://jsonplaceholder.typicode.com');
const id1 = 7;
const id2 = 11;
const title = 'voluptatem laborum magni';

describe('Smoke test', () => {
  it('filtering existing posts', async () => {
    const response = await request.get(getFilteringStr(id1, title));
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body).toHaveLength(1);
  });
  it('filtering non-existent posts', async () => {
    const response = await request.get(getFilteringStr(id2, title));
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body).toHaveLength(0);
  });
});
