import * as Joi from 'joi';
import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../../error-handler/RequestError';
// tslint:disable:variable-name
const userRegSchema = Joi.object().keys({
  firstName: Joi.string()
    .trim()
    .required(),
  lastName: Joi.string()
    .trim()
    .required(),
  email: Joi.string()
    .trim()
    .required(),
  role: Joi.string()
    .trim()
    .required(),
  password: Joi.string()
    .trim()
    .required(),
});

export const userRegRules: RequestHandler = (req, res, next) => {
  Joi.validate(req.body, userRegSchema, (err: any) => {
    if (err) {
      return next(new RequestError(RequestErrorType.BAD_REQUEST, err));
    }
    next();
  });
};
