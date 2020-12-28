import { parseXML } from '../../src/utils/xml';

describe('Utils', () => {
  describe('XML', () => {
    it('Parse small XML', async () => {
      expect.assertions(1);

      const json = await parseXML('<a>Hello</a>');
      expect(json).toEqual({ a: 'Hello' });
    });

    it('Fail on invalid xml', async () => {
      expect.assertions(1);

      await expect(parseXML('{}')).rejects.toThrow('Non-whitespace before first tag');
    });
  });
});
