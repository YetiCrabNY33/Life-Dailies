// Be sure to turn on ts-check once query is available for import
/** @typedef {import('express').Request} Request */
/** @typedef {import('express').Response} Response */
/** @typedef {import('express').NextFunction} NextFunction */

const queryText = require("./sessionQueries");
const { mergeErrors, isValidUserBody } = require("./helpers");

const query = require("./---"); // To be filled out once file is available from merge
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

/**
 * Defines all middleware for user management and authentication.
 */
class UserController {
  /**
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async verifyUser(req, res, next) {
    if (!isValidUserBody(req.body)) {
      return next({ log: "Provided body is not formatted properly.", status: 400 });
    }

    // Selecting shouldn't kick up any errors if nothing is found; rows array should just be empty
    const { username, password } = req.body;
    const foundUser = (await query(queryText.select.user, [username]))?.rows?.[0];
    if (foundUser == null) {
      return res.redirect("/signup");
    }

    try {
      const { pw_hash, salt } = foundUser;
      const passwordsMatch = await bcrypt.compare(`${password}${salt}`, pw_hash);
      if (!passwordsMatch) {
        return res.redirect("/signup");
      }

      res.locals.id = foundUser._id;
      return next();
    } catch (err) {
      err.message = `Error while trying to compare password hashes: ${err.message}`;
      return next({ log: err.stack });
    }
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async createUser(req, res, next) {
    if (!isValidUserBody(req.body)) {
      return next({ log: "Username and password are not formatted properly.", status: 400 });
    }

    const { username, password } = req.body;
    const existingUser = (await query(queryText.select.user, [username]))?.rows?.[0];
    if (existingUser) {
      return next({ log: `Trying to name user with name ${username}. Name already taken.` });
    }

    try {
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
      const hashedPassword = await bcrypt.hash(password, salt);

      await query(queryText.insert.user, [username, salt, hashedPassword]);
      return next();
    } catch (err) {
      const fullError = mergeErrors(new Error("Unable to write new user."), err);
      return next({ log: fullError.stack, status: 500 });
    }
  }
}

module.exports = UserController;
