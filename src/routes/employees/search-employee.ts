import { RequestHandler } from 'express';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { User } from '../../models/User';

export const searchEmployee: RequestHandler = async (req, res, next) => {
  try {
    if (req.body.firstName && req.body.lastName) {
      const resultData = await User.find({
        $and: [
          { firstName: req.body.firstName },
          { lastName: req.body.lastName },
        ],
      })
        .select('firstName lastName email role')
        .exec();
      return res.status(200).send({
        success: true,
        message: 'successfully listed users',
        data: resultData,
      });
    } else {
      return res
        .status(400)
        .send({ status: false, message: 'please provide query parameters' });
    }
  } catch (err) {
    return next(new RequestError(RequestErrorType.BAD_REQUEST, err));
  }
};
