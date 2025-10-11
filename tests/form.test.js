// form.test.js
import { test, expect } from "@playwright/test";

test("Form submits with valid data", async ({ page }) => {
  // Navigate to the page that has your React form
  await page.goto("http://localhost:5173"); // Adjust with your local server URL

  await page.fill('[data-testid="customer-input"]', "CUST0001");
  await page.fill('[data-testid="password-input"]', "admin123");
  await page.waitForTimeout(1000);
  await page.click('[data-testid="login-button"]');
  await page.waitForTimeout(2000);
  await page.goto("http://localhost:5173/beneficiaries");
  await page.waitForTimeout(1000);
  await page.click('[data-testid="add-button"]');
  await page.waitForTimeout(2000);
  // Fill in the form fields
  await page.fill('[data-testid="name-input"]', "john_doe");
  await page.fill('[data-testid="account-number-input"]', "863673654276354623");
  await page.waitForTimeout(2000);
  // Click the submit button
  await page.click('[data-testid="submit-button"]');
  await page.waitForTimeout(2000);
  // Assert that an alert is shown with the correct information
  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toBe(
      "Submitted with Username: john_doe, Account number: 863673654276354623"
    );
    await dialog.dismiss(); // Dismiss the alert after the test
  });
});
