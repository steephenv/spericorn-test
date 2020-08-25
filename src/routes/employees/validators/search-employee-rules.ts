import * as Joi from 'joi';
import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../../error-handler/RequestError';
// tslint:disable:variable-name
const searchEmployeeSchema = Joi.object().keys({
  firstName: Joi.string()
    .trim()
    .required(),
  lastName: Joi.string()
    .trim()
    .required(),
});

export const searchEmpRules: RequestHandler = (req, res, next) => {
  Joi.validate(req.body, searchEmployeeSchema, (err: any) => {
    if (err) {
      return next(new RequestError(RequestErrorType.BAD_REQUEST, err));
    }
    next();
  });
};
