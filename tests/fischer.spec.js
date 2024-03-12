const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pageObject/fischerLoginPage");
const { HomePage } = require("../pageObject/fischerHomePage");
const { UserManagamentPage } = require("../pageObject/fischeruserManagementPage");
const jsonData = require("../testData/fischerData.json");
test.describe("Fischer Identity Portal - Validating Tabs", () => {
  let page;
  let homePage;
  let userManagamentPage;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    const loginpage = new LoginPage(page);
    await loginpage.launchApplication(
      process.env.BASE_URL,
      process.env.user_name,
      process.env.pass_word
    );
    homePage = new HomePage(page);
    userManagamentPage = new UserManagamentPage(page);
  });
  test("Verify My Apps Tab", async () => {
    await homePage.validatingMyAppsTab();
  });
  test("Verify My Passwords Tab", async () => {
    await homePage.validatingMyPasswordsTab();
  });
  test("Verify My Security Tab", async () => {
    await homePage.validatingMySecurityTab();
  });
  test("Verify My Access Tab", async () => {
    await homePage.validatingMyAccessTab();
  });
//   test("Verify My Login History Tab", async () => {
//     await homePage.validatingMyLoginHistoryTab();
//   });
//   test("Verify My Approval Tab", async () => {
//     await homePage.validatingMyApprovalTab();
//   });
//   test("Verify My Request Access Tab", async () => {
//     await homePage.validatingMyRequestAccessTab();
//   });
//   test("Verify View Request Access Tab", async () => {
//     await homePage.validatingviewRequestsTab();
//   });
//   test("Verify User Managament Tab", async () => {
//     await userManagamentPage.validatingUserManagement(jsonData.name);
//   });
//   test("Verify  Manage Accounts Tab", async () => {
//     await userManagamentPage.validatingManageAccountTab();
//   });
//   test("Verify Manage Profile Tab", async () => {
//     await userManagamentPage.validatingManageProfile();
//   });
//   test("Verify Login History Tab", async () => {
//     await userManagamentPage.validatingMyHistoryTab();
//   });
//   test("Verify Policy Membershi...Tab", async () => {
//     await userManagamentPage.validatingPolicy();
//   });
//   test("Verify User Access Tab", async () => {
//     await userManagamentPage.validatingUserAccess();
//   });
//   test("Verify Notifications Tab", async () => {
//     await userManagamentPage.validatingNotificationTab();
//   });
//   test("Verify Aliases Tab", async () => {
//     await userManagamentPage.validatingAliases();
//   });
//   test("Verify Notes Tab", async () => {
//     await userManagamentPage.validatingNotes();
//   });
//   test.afterAll(async () => {
//     await page.close();
//   });
});
