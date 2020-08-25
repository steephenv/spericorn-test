import { RequestHandler } from 'express';
import { validationResult } from 'express-validator/check';

import { RequestError, RequestErrorType } from './RequestError';

export const errValidator: RequestHandler = (req, res, next) => {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    return next(
      new RequestError(RequestErrorType.UNPROCESSABLE_ENTITY, err.mapped()),
    );
  }
  return next();
};
