const jsonData = require("../testData/fischer_apiData.json");
async function generateToken(request) {
  const response = await request.post(
    "https://ebs-v80-qa-20-sso.fischeridentitydev.com/auth/realms/qa/protocol/openid-connect/token",
    {
      form: jsonData.header_form_data,
    }
  );
  if (response.status() != 200) {
    throw new Error(
      `Failed to generate token. Status code: ${response.status}`
    );
  }
  const tokenData = await response.json();
  const access_token = tokenData.access_token;
  const expiresIn = tokenData.expires_in;
  const expirationTimeStamp = Math.floor(Date.now() / 1000) + expiresIn;
  return {
    access_token: access_token,
    exp_timestamp: expirationTimeStamp,
  };
}
module.exports = {
  generateToken,
};