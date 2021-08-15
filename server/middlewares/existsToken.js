const { invalidToken, error } = require("../helpers/httpResponses");
const { getTokenInfo } = require("../helpers/utils");

function existsToken(req, res, next) {
  const headers = req.headers.authorization;
  if (headers) {
    const token = headers.split(" ")[1];
    const tokenInfo = getTokenInfo(token);
    if (tokenInfo.isValid) {
      req.token = token;
      req.user = tokenInfo.payload;
      return next();
    }
    return invalidToken(res);
  }

  error(res, "The authorization header missing");
}

module.exports = existsToken;
