import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
  return {
    testEnvironment: 'node',
    roots: [
      '<rootDir>/src',
      '<rootDir>/test',
    ],
    testMatch: [
      '**/*.spec.ts',
    ],
    transform: {
      '^.+\\.ts$': 'ts-jest'
    },
  };
};
