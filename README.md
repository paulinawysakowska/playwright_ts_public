# Playwright Test Suite

This repository contains a suite of automated tests using Playwright. The tests cover various functionalities, such as searching for products, adding them to the basket, and verifying basket details.

## Table of Contents
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Tests](#tests)
- [Fixtures](#fixtures)
- [Utilities](#utilities)

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
    ```sh
    git clone git@github.com:paulinawysakowska/playwright_ts.git
    ```

2. **Install dependencies:**
    ```sh
    npm install @faker-js/faker@8.4.1
    npm install @playwright/test@1.44.1
    npm install @types/node@20.14.8
    npm install @typescript-eslint/eslint-plugin@7.14.1
    npm install @typescript-eslint/parser@7.14.1
    npm install 2captcha@3.0.5-2
    npm install eslint@8.57.0
    npm install typescript@5.5.2
    ```
3. **Install playwright:**
https://playwright.dev/docs/getting-started-vscode#installation

## Running Tests

To run the tests, use the following command:
    ```sh
    npx playwright test
    ```

 You can also run specific tests or test files:
     ```sh
    npx playwright test tests/your-test-file.spec.ts
    ```

To run tests with the UI:
     ```sh
    npx playwright test --ui
    ```

## Project Structure

**Tests**
Tests are located in the tests directory. Each test file is responsible for a specific functionality or feature.

**Fixtures**
Fixtures are used to set up the testing environment and share common setup across multiple tests. The fixtures are located in the fixtures directory

**Utilities**
Utility functions are located in the utils directory. These functions provide reusable functionality that can be shared across tests.





