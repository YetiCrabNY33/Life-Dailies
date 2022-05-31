// Be sure to turn on ts-check once query is available for import
/** @typedef {import('express').Request} Request */
/** @typedef {import('express').Response} Response */
/** @typedef {import('express').NextFunction} NextFunction */

const queryText = require("./sessionQueries");
const query = require("./---"); // To be filled out once file is available from merge

/** The amount of milliseconds in 15 minutes */
const MS_15_MINUTES = 900_000;

/**
 * Defines all middleware for session management.
 */
class SessionController {
  /**
   * Checks whether a user is already logged in. If they are, their session is refreshed, so that it
   * doesn't expire until later. If they aren't, a new session gets created.
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async prepareSession(req, res, next) {
    const { id } = res.locals;
    if (id == null) {
      return next({ log: new Error("ID is not available from res.locals").stack });
    }

    const activeSession = (await query(queryText.select.session, [id]))?.rows?.[0];
    try {
      // No session at all; can just create it
      if (activeSession == null) {
        await query(queryText.insert.session, [id]);
        return next();
      }

      // If there is a session, just refresh its expires_at value
      /**
       * To be filled in
       */
    } catch (err) {
      err.message = `Error while trying to add/refresh user session: ${err.message}`;
      return next({ log: err.stack });
    }
  }

  /**
   * Checks whether a user is logged in. If they are, a sessionValid value gets added to res.locals.
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async isLoggedIn(req, res, next) {
    const { ssid } = res.locals;
    if (ssid == null) {
      return res.redirect("login");
    }

    const activeSession = await query(queryText.select.session, [ssid]);
    res.locals.sessionValid = activeSession != null;
    return next();
  }

  /**
   * Takes a response object that should have a user ID appened to it, and turns it into an
   * HTTP-only cookie. If an expiration datestamp is provided, the cookie will be set to expire
   * based on that datestamp. Otherwise, the default value of 15 minutes will be used.
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  static async setSsid(req, res, next) {
    const { id, expireDatestamp } = res.locals;
    if (id == null) {
      return next({ log: new Error("Session ID is null").stack, status: 500 });
    }

    const datestampToUse = expireDatestamp ?? new Date(Date.now() + MS_15_MINUTES);
    res.cookie("SSID", id, {
      httpOnly: true,
      expires: datestampToUse,
    });

    return next();
  }
}

module.exports = SessionController;
