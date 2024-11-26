import {expect, test} from '@playwright/test'

test.describe("Verify Login Failure for Invalid User Credentials", () => { // Test Suite can be a feature or category title for the area you are testing - something like: "Login Page Error Handling Tests"
  test("Verify Login Failure for Banned User Account", async ({ page }) => {
    await page.goto("https://saucedemo.com");
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill("locked_out_user"); 
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill("secret_sauce"); 
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText("Epic sadface: Sorry, this user has been locked out.");
  });

  test("Verify Error Message for Incorrect Password", async ({ page }) => {
    await page.goto("https://saucedemo.com");
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill("standard_user"); 
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill("123123"); 
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText("Epic sadface: Username and password do not match any user in this service");
    
  });
  test("Check Error Handling for Empty Username and Password Fields", async ({ page }) => {
    await page.goto("https://saucedemo.com");
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill(""); 
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill("secret_sauce"); 
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText("Epic sadface: Username is required");
    
  });
  test("I don't write the password", async ({ page }) => { //Change this test case name. you did a great job on the other test cases names
    await page.goto("https://saucedemo.com");
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill("standard_user"); 
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill(""); 
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText("Epic sadface: Password is required");
    
  });
  test("Ensure Login Fails for Non-Existent User", async ({ page }) => {
    await page.goto("https://saucedemo.com");
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill("natanel"); 
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill("natanel"); 
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText("Epic sadface: Username and password do not match any user in this service");
    
  });
});