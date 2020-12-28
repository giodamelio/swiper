import { APIGatewayProxyHandler } from 'aws-lambda';
import fetch from 'node-fetch';
import 'source-map-support/register';

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'No body',
      }),
    };
  }

  const body = JSON.parse(event.body);

  if (!body.channelId) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'No channelId',
      }),
    };
  }

  const baseUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=';

  const feedRes = await fetch(`${baseUrl}${body.channelId}`);
  const feed = await feedRes.text();

  return {
    statusCode: 200,
    body: feed,
  };
}
