import { test, expect, firefox, chromium } from '@playwright/test';

test.describe('Playwright Basics', () => {
  test('Should verify credential error when sign in on GitHub', async({page}) => {
    await page.goto('https://github.com/');
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByLabel('Username or email address').fill('jimena@test.com');
    await page.getByLabel('Password').fill('1234567');
    await page.getByRole('button', { name: 'Sign in', exact: true}).click()

    const errorMessage = page.locator('div').filter({ hasText: 'Incorrect username or' }).nth(5)
    await expect(errorMessage).toBeVisible();
  })

  test('Should displays context length', async({}) => {
    const browser = await firefox.launch({});
    const context = await browser.newContext()
    console.log(`Browser context length: ${browser.contexts().length}`);
    const page = await browser.newPage();
    console.log(`Browser context length: ${browser.contexts().length}`);
    await page.goto('https://playwright.dev/')
    await context.close();
    await page.screenshot({ path: './screenshots/playwright-screenshot.png' });
    await browser.close();

  })
})

test.describe('Browser Context with multiple pages', () => {
  test('Should manage multiple pages in a context', async() => {
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page1 = await browser.newPage()
    await page1.goto('https://playwright.dev/docs/intro')
    const page2 = await browser.newPage()
    await page2.goto('https://playwright.dev/docs/writing-tests')

    const allPages = context.pages()

    await page1.screenshot({ path: './screenshots/installation-page.png' });
    await page2.screenshot({ path: './screenshots/writing-tests-page.png' });

    await context.close()
    await browser.close()

  })
})

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
