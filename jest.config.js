const buildLogFolder = 'buildlog';

module.exports = {
  testURL: 'http://localhost/',
  transform: {
    '.*\.tsx?$': 'ts-jest'
  },
  setupFiles: [
    './enzyme.tsx'
  ],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/style-mock.js'
  },
  collectCoverageFrom: [
    '**/app/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/app/index.tsx'
  ],
  coverageDirectory: `${buildLogFolder}/coverage`,
  reporters: [
    'default',
    ['./node_modules/jest-html-reporter', {
      pageTitle: 'Directly Trainning Test Report',
      outputPath: `${buildLogFolder}/test-results.html`,
      includeFailureMsg: true,
      includeConsoleLog: true,
      theme: 'darkTheme',
      sort: 'status'
    }]
  ]
};
