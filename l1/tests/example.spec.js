// @ts-check
import { test, expect } from '@playwright/test';

const testConfig = {
  // url: 'https://drumbun.md/login',  // URL
  url: 'http://127.0.0.1:8000/login',
  user: {
    username: 'cojocarunicolae141+wd1@gmail.com',
    password: 'password',
  },
  timeout: 30000,
};


test('test auth', async ({ page }) => {
  // Open page
  await page.goto(testConfig.url, { timeout: testConfig.timeout });

  // Fill login form
  await page.fill('input[name="email"]', testConfig.user.username);
  await page.fill('input[name="password"]', testConfig.user.password);

  // Submit the form
  await page.click('button.btn-primary');

  // Success: If element with given class exists
  await expect(page.locator('.guide-page__welcome-tst')).toBeVisible();

});
