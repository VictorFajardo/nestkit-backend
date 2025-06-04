import type { Config } from 'jest';
import { compilerOptions } from './tsconfig.json';
import { pathsToModuleNameMapper } from 'ts-jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  moduleNameMapper: {
    '^@config/(.*)$': '<rootDir>/config/$1',
    '^@auth/(.*)$': '<rootDir>/auth/$1',
    '^@users/(.*)$': '<rootDir>/users/$1',
    '^@common/(.*)$': '<rootDir>/common/$1',
    '^@prisma-local/(?!client)(.*)$': '<rootDir>/prisma/$1',
    '^@token/(.*)$': '<rootDir>/token/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1',
    '^@audit-log/(.*)$': '<rootDir>/audit-log/$1',
  },
};

export default config;
