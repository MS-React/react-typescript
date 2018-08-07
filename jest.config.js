const buildLogFolder = 'buildlog';

module.exports = {
  testURL: 'http://localhost/',
  setupFiles: [
    '<rootDir>/test/shim.js',
    '<rootDir>/test/setup.js'
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js'
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "<rootDir>/test/preprocessor.js"
  },
  testRegex: "(app\/(.*)(spec|test).(tsx|ts))$",
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/test/__mocks__/styles.js',
    '^rootApp/(.*)': '<rootDir>/src/app/$1'
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
