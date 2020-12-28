import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from 'aws-lambda';

import { handler } from '../../src/entrypoints/fetch-feed';

async function testHandler(body: string | object | null) {
  if (typeof body === 'object' && body !== null) {
    body = JSON.stringify(body);
  }

  const rawResponse = await handler(
    { body } as APIGatewayProxyEvent,
    {} as Context,
    () => {}
  );

  return JSON.parse((rawResponse as APIGatewayProxyResult).body);
}

describe('Entrypoints', () => {
  describe('fetch-feed', () => {
    it('Fail on no body', async () => {
      expect.assertions(1);

      const response = await testHandler(null);

      expect(response).toEqual({
        error: 'Bad Request',
        message: 'No body',
        statusCode: 400,
      });
    });

    it('Fail on no channelId', async () => {
      expect.assertions(1);

      const response = await testHandler({});

      expect(response).toEqual({
        error: 'Bad Request',
        message: 'No channelId',
        statusCode: 400,
      });
    });

    it('Bad response from YouTube', async () => {
      expect.assertions(1);

      const response = await testHandler({ channelId: 'notarealchannelid'});

      expect(response).toEqual({
        error: 'Bad Request',
        message: 'Bad response from YouTube',
        statusCode: 400,
      });
    });
  });
});
