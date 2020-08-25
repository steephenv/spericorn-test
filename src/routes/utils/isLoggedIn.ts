import { RequestHandler } from 'express';

import { attachTokenData } from '../access-control/attach-token-data';

export const isLoggedIn: RequestHandler = async (req, res, next) => {
  try {
    const loginResult = await attachTokenData(req, res, next);
    if (!loginResult.success) {
      throw new Error(loginResult.error);
    }
    next();
  } catch (err) {
    return res.status(401).send({ success: false, message: 'login failed' });
  }
};
