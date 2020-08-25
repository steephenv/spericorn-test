import { RequestHandler } from 'express';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { User } from '../../models/User';

export const listEmployee: RequestHandler = async (req, res, next) => {
  try {
    const resultData = await User.find({ role: 'EMPLOYEE' })
      .sort({ createdAt: -1 })
      .exec();
    return res.status(200).send({
      success: true,
      message: 'successfully listed users',
      data: resultData,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.BAD_REQUEST, err));
  }
};
