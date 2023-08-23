import type { Config } from "@jest/types";

/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.(css|png)$": "<rootDir>/jest/fileTransform.cjs",
    "^.+\\.(svg)$": "<rootDir>/jest/svg.cjs",
  },
} as Config.InitialOptions;
