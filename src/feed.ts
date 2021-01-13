import fetch from 'node-fetch';
import { parseString } from 'xml2js';

import { VideoId } from './models/video';

export const videoFeedPrefix =
  'https://www.youtube.com/feeds/videos.xml?channel_id=';

export function parseXML(input: string): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    parseString(input, { explicitArray: false }, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
}

type FeedEntry = {
  id: VideoId;
  title: string;
  description: string;
  thumbnail: string;
  published: Date;
  updated: Date;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export default async function fetchFeed(id: VideoId): Promise<FeedEntry[]> {
  const response = await fetch(`${videoFeedPrefix}${id}`);
  const textXML = await response.text();
  const feed = await parseXML(textXML);
  // eslint-disable-next-line @typescript-eslint/ban-types
  const rawEntries = (feed.feed as Record<string, unknown>).entry as Record<
    string,
    unknown
  >[];
  return rawEntries.map(
    // eslint-disable-next-line @typescript-eslint/ban-types
    (entry: Record<string, unknown>): FeedEntry => {
      return {
        id: entry['yt:videoId'] as VideoId,
        title: entry.title as string,
        description: (entry['media:group'] as Record<string, unknown>)[
          'media:description'
        ] as string,
        thumbnail: (((entry['media:group'] as Record<string, unknown>)[
          'media:thumbnail'
        ] as Record<string, unknown>).$ as Record<string, unknown>)
          .url as string,
        published: new Date(entry.published as string),
        updated: new Date(entry.updated as string),
      };
    }
  );
}
