const { expect } = require("@playwright/test");
const { allure } = require("allure-playwright")
require("dotenv").config();
exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.mainLogo = page.locator("//div[@id='kc-header-wrapper']");
    this.usernameField = page.locator("#username");
    this.passwordField = page.locator("#password");
    this.loginBtn = page.locator("#kc-login");
  }
  async launchApplication(url, username, password) {
    await allure.step('Navigate to Application URL', async () => {
      await this.page.goto(url);
      await this.page.waitForTimeout(parseInt(process.env.medium_wait));
    });
    await allure.step('Expect Main Logo to be Visible', async () => {
      await expect(this.mainLogo).toBeVisible();
    });
    await allure.step('Expect Username Field to be Visible', async () => {
      await expect(this.usernameField).toBeVisible();
    });
    await allure.step('Type Username', async () => {
      await this.usernameField.type(username);
    });
    await allure.step('Expect Password Field to be Visible', async () => {
      await expect(this.passwordField).toBeVisible();
    });
    await allure.step('Type Password', async () => {
      await this.passwordField.type(password);
    });
    await allure.step('Expect Login Button to be Enabled', async () => {
      await expect(this.loginBtn).toBeEnabled();
    });
    await allure.step('Click on Login Button', async () => {
      await this.loginBtn.click();
    });
  }
};
