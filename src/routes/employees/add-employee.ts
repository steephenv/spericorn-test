import { RequestHandler } from 'express';
import { User } from '../../models/User';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const addEmployee: RequestHandler = async (req, res, next) => {
  try {
    const exists = await User.findOne({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    }).exec();
    if (exists) {
      return res.status(400).send({
        success: false,
        message: 'user with given data already exists',
      });
    } else {
      const newEmployee = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: 'EMPLOYEE',
        createdAt: new Date(),
      });
      const savedData = await newEmployee.save();
      const respData = await User.findOne({ _id: savedData._id })
        .select('firstName lastName email role')
        .exec();
      return res.status(200).send({
        success: true,
        message: 'User successfully created',
        data: respData,
      });
    }
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
