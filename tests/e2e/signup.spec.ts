import { test, expect } from '@playwright/test';

test.describe('Signup Flow E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('toggles password visibility', async ({ page }) => {
    await page.reload(); 
  
    const form = page.locator('form');
    await form.waitFor(); 
    const passwordInput = form.locator('input[name="password"]');
  
    await expect(passwordInput).toHaveAttribute('type', 'password');
    await form.locator('.toggle-password-button').click();
    await expect(passwordInput).toHaveAttribute('type', 'text');
  });

});
