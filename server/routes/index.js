const Router = require("express").Router;
const userController = require("../core/controllers/userController");
const authMiddleware = require("../shared/middlewares/authMiddleware");
const { authenticationValidators: authValidators } = require("./validators");

const router = new Router();

// Registration and account activation via email
router.post("/registration", ...authValidators, userController.registration);
router.get("/activate/:link", userController.activate);

// Login and logout
router.post("/login", ...authValidators, userController.login);
router.post("/logout", userController.logout);

// Refresh tokens
router.get("/refresh", userController.refresh);

// Get users list (available only for authorized users)
router.get("/users", authMiddleware, userController.getUsers);

module.exports = router;
