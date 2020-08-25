import { RequestHandler } from 'express';
import { User } from '../../models/User';
import { Jwt } from '../auth/utils/Jwt';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const login: RequestHandler = async (req, res, next) => {
  try {
    req.body.username = (req.body.username as string).toLowerCase();
    const user: any = await User.findOne({ email: req.body.username }).exec();
    if (!user) {
      return res.status(401).send({ message: 'Invalid User' });
    }

    const compare = await user.comparePassword(req.body.password);
    if (!compare) {
      return res.status(401).send({ message: 'Invalid Credentials' });
    }

    const accessToken = await Jwt.sign({
      userId: user._id,
      role: user.role,
    });
    const userDetails = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
    return res.status(200).send({
      success: true,
      user: userDetails,
      token: accessToken,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
