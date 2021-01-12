import { badAdd } from '../src/index';

describe('badAdd()', () => {
  it('Good add?', () => {
    expect(badAdd(1, 2)).toBe(3);
  });
});
