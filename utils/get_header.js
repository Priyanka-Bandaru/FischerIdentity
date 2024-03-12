function getHeader(access_token) {
  return {
    Authorization: `Bearer ${access_token}`,
    "X-Fii-UserId": "-81126430295779360995295669317416234544",
    accept: "text/plain",
  };
}
module.exports = { getHeader };