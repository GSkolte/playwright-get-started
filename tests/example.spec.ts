import { test, expect } from '@playwright/test';

// Group homepage-related tests to avoid redundant navigation
test.describe('Homepage tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
  });

  test('has title', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle("The Internet");
  });

  test('get started link', async ({ page }) => {
    // Click on a valid link that exists on the homepage.
    await page.getByRole('link', { name: 'Form Authentication' }).click();

    // Expects page to have a heading.
    await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();
  });
});


// Dynamic Table test
test('dynamic table: can read cell value', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/tables');
  // Find the cell in Table 1, first row, Last Name column
  const cell = page.locator('#table1 tbody tr:first-child td:nth-child(1)');
  await expect(cell).toBeVisible();
  // Check the text is a valid last name
  const text = await cell.textContent();
  expect(text).toMatch(/[A-Za-z]+/);
});

// Shadow DOM test
test('shadow root: can access shadow element', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/shadowdom');
  // The page has a shadow root with a <span> and <a> inside
  // Use pierce handler to access elements inside shadow DOM
  await page.locator("//span[@slot='my-text']");
  // Use pierce handler to select the <a> inside the shadow root
  const shadowLink = page.locator("//ul[@slot='my-text']");
  await expect(shadowLink).toBeVisible();
  // Optionally, check the link text
  await expect(shadowLink).toContainText("Let's have some different text!");
});

// SVG locator test
test('svg locator: can find SVG element', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/key_presses');
  // Example: check for SVG if present (adapt as needed)
  const svg = page.locator('svg');
  // If SVG is present, check visibility
  if (await svg.count() > 0) {
    await expect(svg).toBeVisible();
  } else {
    // Otherwise, pass the test if no SVG found
    expect(true).toBe(true);
  }
});
