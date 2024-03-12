import { expect } from "@playwright/test";
const jsonData = require("../testData/fischerData.json");
const { allure } = require("allure-playwright")
require("dotenv").config();
exports.UserManagamentPage = class UserManagamentPage {
  constructor(page) {
    this.page = page;
    this.userCard = (userCardIndex) => {
      return page.locator(
        `(//div[contains(@class,'home-grid')]//button[@dir='ltr'])[${userCardIndex}]`
      );
    };
    this.filterbtn_myLoginHistory = page.locator("//button[@title='Filter']");
    this.userManagamentTab = page.locator(
      "(//span[text()='User Management'])[2]"
    );
    this.serachArea = page.locator("//input[@placeholder='Quick Search..']");
    this.listItem = (name) => {
      return page.locator(
        `(//span[contains(normalize-space(),'${name}')])[1]/../..`
      );
    };
    this.userDetails = page.locator("//h1[text()='User Details']");
    this.goDashboard = page.locator("//span[text()='Dashboard']");
    this.Dashboard = page.locator("//span[text()='Dash']");
    this.title_manageAccounts = page.locator(
      "//h1[text()='User Accounts']"
    );
    this.title_manageProfile = page.locator("//h1[text()='Profile']");
    this.title_Policy = page.locator(
      "//h1[text()='Policy Membership']"
    );
    this.startdate_userAccess = page.locator(
      "(//label[text()='Start Date:'])[1]"
    );
    this.reload_Notification = page.locator("//button[@title='Reload']");
    this.activeAliases_Aliases = page.locator("//div[text()='Active Aliases']");
    this.deliverablebtn_Aliases = page.locator(
      "//button[@title='Add Deliverable']"
    );
    this.notesarea_Area = page.locator("//textarea[@class='k-input-inner']");
  }
  async validatingUserManagement(name) {
    await allure.step('Click on User Management Card', async () => {
      await this.userCard(9).click();
    });
    await allure.step('Search and Select User', async () => {
      await this.serachArea.click();
      await this.serachArea.type(name);
      await this.listItem(name).click();
    });
    await allure.step('Expect User Details to be visible', async () => {
      await expect(this.userDetails).toBeVisible();
    });
  }
  async validatingManageAccountTab() {
    await allure.step('Click on Manage Account Tab', async () => {
      await this.userCard(1).click();
    });
    await allure.step('Expect Password Text to match', async () => {
      await expect(this.title_manageAccounts).toBeVisible();
    });
    await allure.step('Navigate to Dashboard', async () => {
      await this.goDashboard.click();
    });
  }
  async validatingManageProfile() {
    await allure.step('Click on Manage Profile Tab', async () => {
      await this.userCard(2).click();
    });
    await allure.step('Expect General Section to be visible', async () => {
      await expect(this.title_manageProfile).toBeVisible();
    });
    await allure.step('Navigate to Dashboard', async () => {
      await this.goDashboard.click();
    });
  }
  async validatingMyHistoryTab() {
    await allure.step('Click on My History Tab', async () => {
      await this.userCard(3).click();
    });
    await allure.step('Expect Filter Button to be Enabled', async () => {
      await expect(this.filterbtn_myLoginHistory).toBeEnabled();
    });
    await allure.step('Navigate to Dashboard', async () => {
      await this.goDashboard.click();
    });
  }
  async validatingPolicy() {
    await allure.step('Click on Policy Tab', async () => {
      await this.userCard(4).click();
    });
    await allure.step('Expect Identify Account in Policy to be Visible', async () => {
      await expect(this.title_Policy).toBeVisible();
    });
    await allure.step('Navigate to Dashboard', async () => {
      await this.goDashboard.click();
    });
  }
  async validatingUserAccess() {
    await allure.step('Click on User Access Tab', async () => {
      await this.userCard(5).click();
    });
    await allure.step('Expect Start Date in User Access to be Visible', async () => {
      await expect(this.startdate_userAccess).toBeVisible();
    });
    await allure.step('Navigate to Dashboard', async () => {
      await this.goDashboard.click();
    });
  }
  async validatingNotificationTab() {
    await allure.step('Click on Notification Tab', async () => {
      await this.userCard(6).click();
    });
    await allure.step('Expect Reload Notification to be Visible', async () => {
      await expect(this.reload_Notification).toBeVisible();
    });
    await allure.step('Navigate to Dashboard', async () => {
      await this.goDashboard.click();
    });
  }
  async validatingAliases() {
    await allure.step('Click on Aliases Tab', async () => {
      await this.userCard(7).click();
    });
    await allure.step('Expect Active Aliases to be Visible', async () => {
      await expect(this.activeAliases_Aliases).toBeVisible();
    });
    await allure.step('Expect Deliverable Button to be Enabled', async () => {
      await expect(this.deliverablebtn_Aliases).toBeEnabled();
    });
    await allure.step('Navigate to Dashboard', async () => {
      await this.goDashboard.click();
    });
  }
  async validatingNotes() {
    await allure.step('Click on Notes Tab', async () => {
      await this.userCard(8).click();
    });
    await allure.step('Expect Notes Area to be Editable', async () => {
      await expect(this.notesarea_Area).toBeEditable();
    });
    await allure.step('Navigate to Dashboard', async () => {
      await this.goDashboard.click();
    });
  }
};