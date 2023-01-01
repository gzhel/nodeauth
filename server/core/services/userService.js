const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mailService");
const tokenService = require("./tokenService");
const UserDTO = require("../../shared/dtos/userDTO");
const ApiError = require("../../shared/errors/apiError");

class UserService {
  async registration(email, password) {
    const isUserExists = await userModel.findOne({ email });
    if (isUserExists) {
      throw ApiError.BadRequest(`User with email ${email} is already exists`);
    }

    // Password stored in db in hashed format
    const hashPassword = await bcrypt.hash(password, 3);

    // Random link for account activation via email
    const activationLink = uuid.v4();

    // Create user providing user email, hash password and generated activation link to db
    const user = await userModel.create({
      email,
      password: hashPassword,
      activationLink,
    });

    // Send activation mail to registered user email
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );

    // Creating user DTO (object) using user from db: id, email, isActivated
    const userDTO = new UserDTO(user);

    // Generates access and refresh tokens pair for JWT authorization
    const tokens = tokenService.generateTokens({ ...userDTO });

    // Saves refresh token to db
    await tokenService.saveToken(userDTO.id, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: userDTO,
    };
  }

  async activate(activationLink) {
    // Find user by activation link from db (we add activation link when user registered)
    const user = await userModel.findOne({ activationLink });

    // If we click wrong activation link, we get an error
    if (!user) throw ApiError.BadRequest("Incorrect activation link");

    // Change db parameter isActivated for user in db
    user.isActivated = true;
    return user.save();
  }

  async login(email, password) {
    // Find user with that email (email should be unique)
    const user = await userModel.findOne({ email });
    if (!user) throw ApiError.BadRequest("User was not found");

    // Check that hashed password from db and login password are equals
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) throw ApiError.BadRequest("Incorrect password");

    // Creating user DTO (object) using user from db: id, email, isActivated
    const userDTO = new UserDTO(user);

    // Generates access and refresh tokens pair for JWT authorization
    const tokens = tokenService.generateTokens({ ...userDTO });

    // Saves refresh token to db
    await tokenService.saveToken(userDTO.id, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: userDTO,
    };
  }

  async logout(refreshToken) {
    // Delegation of token removal task to token service
    return await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    // If cookies have no refresh token, then user is not authorized
    if (!refreshToken) {
      console.log(444, !refreshToken);
      throw ApiError.UnauthorizedError();
    }

    // Validates that access token is correct
    const userData = tokenService.validateRefreshToken(refreshToken);

    // Check that refresh token in db and return exactly this token
    const tokenFromDB = await tokenService.findToken(refreshToken);

    // If token is not correct and db have not this token, then user is unauthorized
    if (!userData || !tokenFromDB) {
      console.log(555, !userData, !tokenFromDB);
      throw ApiError.UnauthorizedError();
    }

    // Gets user from db by id
    const user = await userModel.findById(userData.id);

    // Creating user DTO (object) using user from db: id, email, isActivated
    const userDTO = new UserDTO(user);

    // Generates access and refresh tokens pair for JWT authorization
    const tokens = tokenService.generateTokens({ ...userDTO });

    // Saves refresh token to db
    await tokenService.saveToken(userDTO.id, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: userDTO,
    };
  }

  async getAllUsers() {
    // Gets all users from db
    const users = await userModel.find();

    return users;
  }
}

module.exports = new UserService();
