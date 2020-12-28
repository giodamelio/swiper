import { APIGatewayProxyHandler } from 'aws-lambda';
import fetch from 'node-fetch';
import { badRequest } from '@hapi/boom';

import { parseXML } from '../utils/xml';

import 'source-map-support/register';

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  try {
    if (!event.body) {
      throw badRequest('No body');
    }

    const body = JSON.parse(event.body);

    if (!body.channelId) {
      throw badRequest('No channelId');
    }

    const baseUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=';

    const feedRes = await fetch(`${baseUrl}${body.channelId}`);

    if (!feedRes.ok) {
      throw badRequest('Bad response from YouTube');
    }

    const feedText = await feedRes.text();
    const feed = await parseXML(feedText);

    return {
      statusCode: 200,
      body: JSON.stringify(feed.feed.entry.map(({title}) => title)),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode,
      body: JSON.stringify({
        error: err.error,
        message: err.message,
      }),
    };
  }
}
