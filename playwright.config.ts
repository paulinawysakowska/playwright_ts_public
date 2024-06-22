import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './ecommerce/tests',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  reporter: [['list'], ['html']],
  use: {
    trace: 'on',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: ['--start-maximized']
        }
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        launchOptions: {
          args: ['-width', '1920', '-height', '1080']
        }
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 }
      },
    },
  ],
});
