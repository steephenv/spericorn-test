import * as Joi from 'joi';
import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../../error-handler/RequestError';
// tslint:disable:variable-name
const addEmpSchema = Joi.object().keys({
  firstName: Joi.string()
    .trim()
    .required(),
  lastName: Joi.string()
    .trim()
    .required(),
  email: Joi.string()
    .trim()
    .required(),
});

export const addEmpRules: RequestHandler = (req, res, next) => {
  Joi.validate(req.body, addEmpSchema, (err: any) => {
    if (err) {
      return next(new RequestError(RequestErrorType.BAD_REQUEST, err));
    }
    next();
  });
};
