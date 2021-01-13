import createConnection from '../src/database';

describe('database connection', () => {
  it('successfully run query', async () => {
    const db = await createConnection();
    const tables = await db.manager.query('SELECT 1 + 1');
    expect(tables).toEqual([{ '1 + 1': 2 }]);
  });
});
