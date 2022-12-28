const ApiError = require("../errors/apiError");
const tokenService = require("../../core/services/tokenService");

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return next(ApiError.UnauthorizedError()); // User is not authorized

    const accessToken = authHeader.split(" ")[1]; // Bearer token is empty
    if (!accessToken) return next(ApiError.UnauthorizedError());

    const userData = tokenService.validateAccessToken(accessToken); // Validates that access token is correct
    if (!userData) return next(ApiError.UnauthorizedError());

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
}

module.exports = authMiddleware;
