const { expect } = require("@playwright/test");
const jsonData = require("../testData/fischerData.json");
const { allure } = require("allure-playwright")
require("dotenv").config();

exports.HomePage = class HomePage {
  constructor(page) {
    this.page = page;
    this.featureItem = (featureIndex) => {
      return page.locator(
        `(//div[contains(@class,'home-grid')]//button[@dir='ltr'])[${featureIndex}]`
      );
    };
    this.pinnedapps_myApps = page.locator(
      "//div[contains(@class,'drawer-content')]//span[contains(text(),'Pinned Apps')]"
    );
    this.unpinned_myApps = page.locator(
      "//div[contains(@class,'drawer-content')]//span[contains(text(),'Unpinned Apps')]"
    );
    this.gotoHomeIcon = page.locator(
      "//div[contains(@class,'drawer-content')]//button[@title='Home']"
    );
    this.title_MyPassword = page.locator(
      "//h1[text()='My Passwords']"
    );
    this.activeDirectory_myAccess = page.locator(
      "//div[contains(@class,'drawer-content')]//span[contains(text(),'Active Directory')]"
    );
    this.filterbtn_myLoginHistory = page.locator("//button[@title='Filter']");
    this.manageDelegation_myApprovals = page.locator(
      "//span[text()='Manage Delegation']"
    );
    this.logo_myRequest = (page) =>
      page.locator("//img[@alt='Fischer Identity']");
    this.changeaccess_viewRequest = (page) =>
      page.locator("//a[@title='Change Access to Provisioned accounts']");
  }
  async validatingMyAppsTab() {
    await allure.step('Click on My Apps Tab', async () => {
      await this.featureItem(1).click();
    });
    await allure.step('Expect My Apps Tab to be visible', async () => {
      await expect(this.pinnedapps_myApps).toBeVisible();
    });
    await allure.step('Navigate to Home Icon', async () => {
      await this.gotoHomeIcon.click();
    });
  }
  async validatingMyPasswordsTab() {
    await allure.step('Click on My Passwords Tab', async () => {
      await this.featureItem(2).click();
    });
    await allure.step('Expect My Passwords Tab to be visible', async () => {
      await expect(this.title_MyPassword).toBeVisible();
    });
    await allure.step('Navigate to Home Icon', async () => {
      await this.gotoHomeIcon.click();
    });
  }
  async validatingMySecurityTab() {
    await allure.step('Click on My Security Tab', async () => {
      await this.featureItem(3).click();
    });
    await allure.step('Navigate to Home Icon', async () => {
      await this.gotoHomeIcon.click();
    });
  }
  async validatingMyAccessTab() {
    await allure.step('Click on My Access Tab', async () => {
      await this.featureItem(4).click();
    });
    await allure.step('Expect My Access Tab to have text', async () => {
      await expect(this.activeDirectory_myAccess).toHaveText(
        jsonData.directory_myaccess
      );
    });
    await allure.step('Navigate to Home Icon', async () => {
      await this.gotoHomeIcon.click();
    });
  }
  async validatingMyLoginHistoryTab() {
    await allure.step('Click on My Login History Tab', async () => {
      await this.featureItem(5).click();
    });
    await allure.step('Expect Filter Button to be enabled', async () => {
      await expect(this.filterbtn_myLoginHistory).toBeEnabled();
    });
    await allure.step('Navigate to Home Icon', async () => {
      await this.gotoHomeIcon.click();
    });
  }
  async validatingMyApprovalTab() {
    await allure.step('Click on My Approval Tab', async () => {
      await this.featureItem(6).click();
    });
    await allure.step('Expect Manage Delegation to have text', async () => {
      await expect(this.manageDelegation_myApprovals).toHaveText(
        jsonData.delegationtex_myapprovals
      );
    });
    await allure.step('Navigate to Home Icon', async () => {
      await this.gotoHomeIcon.click();
    });
  }
  async validatingMyRequestAccessTab() {
    await allure.step('Validate My Request Access Tab', async () => {
      const pagePromise = this.page.waitForEvent("popup");
      await this.featureItem(7).click();
      const newwindow = await pagePromise;
      await newwindow.waitForLoadState();
      await this.page.waitForTimeout(parseInt(process.env.small_wait));
      await newwindow.reload();
      await allure.step('Expect title to match', async () => {
        expect(await newwindow.title());
      });
      await newwindow.close();
    });
  }
  async validatingviewRequestsTab() {
    await allure.step('Validate My Request Access Tab', async () => {
      const pagePromise = this.page.waitForEvent("popup");
      await this.featureItem(8).click();
      const newwindow = await pagePromise;
      await newwindow.waitForLoadState();
      await this.page.waitForTimeout(parseInt(process.env.small_wait));
      await newwindow.reload();
      await allure.step('Expect title to match', async () => {
        expect(await newwindow.title());
      });
      await newwindow.close();
    });
  }
  async validatingUserManagement(name) {
    await allure.step('Validate User Management Tab', async () => {
      await this.featureItem(9).click();
    });
    await allure.step('Search and Select User', async () => {
      await this.serachArea.click();
      await this.serachArea.type(name);
      await this.listItem(name).click();
    });
    await allure.step('Expect User Details to be visible', async () => {
      await expect(this.userdetails).toBeVisible();
    });
  }
};
