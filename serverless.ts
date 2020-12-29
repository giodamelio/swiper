import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'swiper',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    'fetch-feed': {
      handler: 'src/entrypoints/fetch-feed.handler',
      events: [
        {
          http: {
            method: 'post',
            path: 'fetch-feed',
          }
        }
      ]
    }
  },
  resources: {
    Resources: {
      videosTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'swiper-videos',
          AttributeDefinitions: [
            {
              AttributeName: 'youtubeId',
              AttributeType: 'S'
            }
          ],
          KeySchema: [
            {
              AttributeName: 'youtubeId',
              KeyType: 'HASH'
            }
          ],
          BillingMode: 'PAY_PER_REQUEST'
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
