import createConnection from '../../src/database';
import { Video } from '../../src/models';

describe('models', () => {
  beforeAll(async () => {
    await createConnection();
  });

  describe('Video', () => {
    it('save a single video', async () => {
      expect.assertions(1);

      const coolSubmarineVideo = Video.create({
        id: 'bPJUVKizh90',
        title: 'How to Make Pizza on a Submarine - Smarter Every Day 246',
        description: '<too long>',
        thumbnail: 'https://i3.ytimg.com/vi/bPJUVKizh90/hqdefault.jpg',
        published: new Date('2020-11-01T17:10:34+00:00'),
        updated: new Date('2020-12-18T09:13:39+00:00'),
      });
      await coolSubmarineVideo.save();

      expect(await Video.count()).toBe(1);
    });
  });
});
