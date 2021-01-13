import createConnection from '../src/database';
import { Video } from '../src/models';
import fetchFeed, { parseXML } from '../src/feed';

const smarterEveryDayChannelId = 'UC6107grRI4m0o2-emgoDnAA';

describe('feed', () => {
  beforeAll(async () => {
    await createConnection();
  });

  describe('parseXML()', () => {
    it('parse simple xml', async () => {
      expect.assertions(1);

      const xml = await parseXML('<hello name="Gio"></hello>');
      expect(xml).toEqual({ hello: { $: { name: 'Gio' } } });
    });

    it('invalid xml', async () => {
      expect.assertions(1);

      await expect(parseXML('{}')).rejects.toThrow(
        /Non-whitespace before first tag/
      );
    });
  });

  it('fetch and parse real video feed', async () => {
    expect.assertions(1);

    const feed = await fetchFeed(smarterEveryDayChannelId);

    // Bulk create and save all the videos from the feed
    const videos = Video.create(feed);
    await Video.save(videos);

    expect(await Video.count()).toBe(15);
  });
});
