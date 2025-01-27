// @ts-check
import { test, expect } from '@playwright/test';

const testConfig = {
  url: 'https://drumbun.md/login',  // URL
  user: {
    username: 'cojocarunicolae141+pwtest@gmail.com',
    password: 'Pg4sekHydw62Zm8',      // Unique and random
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
  await page.click('button[type="submit"]');

  // Success: If element with given class exists
  await expect(page.locator('.profile-usertitle-name')).toBeVisible();

});
