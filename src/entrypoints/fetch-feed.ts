import { APIGatewayProxyHandler } from 'aws-lambda';
import fetch from 'node-fetch';
import { badRequest } from '@hapi/boom';

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
    const feed = await feedRes.text();

    return {
      statusCode: 200,
      body: feed,
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
