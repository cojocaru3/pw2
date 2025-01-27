const { test, expect } = require('@playwright/test');

// Define an array of users
const users = [
  { username: 'cojocarunicolae141+pwtest@gmail.com', password: 'Pg4sekHydw62Zm8', should_pass: true },
  { username: 'cojocarunicolae141+pwtest1@gmail.com', password: 'wrong_pass', should_pass: false },
];


test.describe('Authentication Tests', () => {
    // Loop through the array of users and create a test for each one
    users.forEach(({ username, password, should_pass }) => {
      test(`Test auth for user: ${username}`, async ({ page }) => {
        // Open page
        await page.goto('https://drumbun.md/login', { timeout: 10000 });
  
        // Fill login form
        await page.fill('input[name="email"]', username);
        await page.fill('input[name="password"]', password);
  
        // Submit the form
        await page.click('button[type="submit"]');
  
        if(should_pass) {
            await expect(page.locator('.profile-usertitle-name')).toBeVisible();
        } else {
            await expect(page.locator('text=Login sau parola greșite')).toBeVisible();
        }
      });
    });
  });