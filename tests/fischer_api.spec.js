import { test, expect } from "@playwright/test";
const jsonData = require("../testData/fischer_apiData.json");
const { generateToken } = require("../utils/generate_token");
const { getHeader } = require("../utils/get_header");
var userSchema = require("../testData/schema.json");
import { allure } from "allure-playwright";
require("dotenv").config();
const Ajv = require("ajv");
let access_token, user, expirationTimeStamp;
let token_flag = true;
test.beforeEach(async ({ request }) => {
  if (token_flag) {
    const tokenInfo = await generateToken(request);
    access_token = tokenInfo.access_token;
    expirationTimeStamp = tokenInfo.exp_timestamp;
    token_flag = false;
  }
  const currentTimestamp = Math.floor(Date.now() / 1000);
  if (currentTimestamp >= expirationTimeStamp) {
    const newTokenInfo = await generateToken(request);
    access_token = newTokenInfo.access_token;
    expirationTimeStamp = newTokenInfo.exp_timestamp;
  }
});
test("Api for obtaining a list of all users", async ({ request }) => {
  const response = await request.get(
    `${process.env.fischer_API_baseurl}${jsonData.get_users_endPoint}`,
    {
      headers: getHeader(access_token),
    }
  );

  await allure.step("Expecting HTTP Response Code as 200 OK", async () => {
    expect(response.ok()).toBe(true);
  });
  const result = await response.json();
  await allure.step(
    " Expecting that the 'results' property in the API response is an instance of an array",
    async () => {
      expect(result.results).toBeInstanceOf(Array);
    }
  );
  user = result.results[1];
});
test("Validate data for a particular UserId", async ({ request }) => {
  const userId = user["Identity-PBWUSERID"];
  const response = await request.get(
    `${process.env.fischer_API_baseurl}${jsonData.get_users_endPoint}/${userId}`,
    {
      headers: getHeader(access_token),
    }
  );
  const specificUser = await response.json();
  await allure.step("Expecting HTTP Response Code as 200 OK", async () => {
    expect(response.status()).toBe(parseInt(process.env.status_code));
  });
  await allure.step(
    "Validating Selected User Data in the Response",
    async () => {
      expect(JSON.stringify(user) === JSON.stringify(specificUser)).toBe(true);
    }
  );
});
test("Api for obtaining the qualified groups of a user with schema validation", async ({
  request,
}) => {
  const response = await request.get(
    `${process.env.fischer_API_baseurl}${jsonData.get_group_endPoint}`,
    {
      headers: getHeader(access_token),
    }
  );
  await allure.step("Expecting HTTP Response Code as 200 OK", async () => {
    expect(response.status()).toBe(parseInt(process.env.status_code));
  });
  const result = await response.json();
  const ajv = new Ajv();
  const validate = ajv.compile(userSchema.data);
  const isValid = validate(result);
  await allure.step("JSON Schema Validation for a user", async () => {
    expect(isValid).toBe(true);
  });
});
