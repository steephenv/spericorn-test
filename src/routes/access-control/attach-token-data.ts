/**
 * A middleware that verifies JWT token if available
 * and attach it to res.locals.user.
 *
 * This middleware DOES NOT return any error.
 */

import { RequestHandler } from 'express';

import { Jwt } from '../auth/utils/Jwt';

export const attachTokenData: RequestHandler = async (req, res, next) => {
  try {
    const token = (req.get('Authorization') || '').split(' ');

    // check for Bearer token
    if (token[0] === 'Bearer') {
      const decodedToken = await Jwt.verify(token[1]);
      // Attach token to res
      res.locals.user = decodedToken;
    } else {
      throw new Error('Invalid Token');
    }
    return { success: true };
  } catch (err) {
    // console.log(error);
    return { success: false, error: err };
  }
};
