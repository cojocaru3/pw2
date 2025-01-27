const user = {
    firstName: 'John',
    lastName: 'Doe',
    // email: 'john.doe@example.com',
    email: `user${Math.floor(Math.random() * 10000)}@example.com`,
  
    // Method to validate email
    isValidEmail() {
      // Using a regular expression to validate the email format
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(this.email);
    },
  
    // Method to get the full name
    getFullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  };

const { test, expect } = require('@playwright/test');

test('Email validation and form submission', async ({ page }) => {
  // Check if the email is valid
  if (!user.isValidEmail()) {
    console.error('The provided email is not valid:', user.email);
    return; // Stop the test if the email is invalid
  }

  // Open the login or registration page
  await page.goto('https://drumbun.md/register');

  const pass = Math.random(11111111, 9999999999).toString();

  // Fill out the form with the valid email and full name
  await page.fill('input[name="surname"]', user.firstName);
  await page.fill('input[name="first_name"]', user.lastName);
  await page.fill('input[name="email"]', user.email);
  await page.fill('input[name="password"]', pass);
  await page.fill('input[name="password_confirmation"]', pass);

  // Set the relative file path


  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles('./assets/image.png');


  // Simulate form submission
  await page.click('button[type="submit"]');

  // Check if the form was submitted successfully
  await expect(page.locator('.auth-page-hero-title')).toBeVisible();

});

  