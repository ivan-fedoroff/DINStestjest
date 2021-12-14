import supertest from 'supertest';
import cases from 'jest-in-case';
import getFilteringStr from '../index';

const request = supertest('https://jsonplaceholder.typicode.com');
const title = 'voluptatem laborum magni';

describe('Smoke test of filtering request', () => {
  cases('have status OK', async (opts) => {
    const response = await request.get(opts.input);
    expect(response.status).toBe(opts.result); // eslint-disable-line
  }, {
    'test with not empty result': { input: getFilteringStr(7, title), result: 200 },
    'test with empty result': { input: getFilteringStr(2, title), result: 200 },
  });
  cases('have array in body', async (opts) => {
    const response = await request.get(opts.input);
    expect(Array.isArray(response.body)).toBeTruthy(); // eslint-disable-line
  }, {
    'test with not empty result': { input: getFilteringStr(7, title) },
    'test with empty result': { input: getFilteringStr(2, title) },
  });
  cases('have different length of body', async (opts) => {
    const response = await request.get(opts.input);
    expect(Array.isArray(response.body)).toHaveLength(opts.result); // eslint-disable-line
  }, {
    'test with not empty result: length is 1': { input: getFilteringStr(7, title), result: 1 },
    'test with empty result: length is 0': { input: getFilteringStr(2, title), result: 0 },
  });
});
