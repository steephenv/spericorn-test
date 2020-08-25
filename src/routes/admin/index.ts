import * as express from 'express';
import { errValidator } from '../../error-handler/error-validator';
import { loginRule } from './validators/login.rules';
import { userRegRules } from './validators/register.rules';
// import { isLoggedIn } from '../utils/isLoggedIn';

import { login } from './login';
import { createUser } from './register';

export const user = express.Router();

user.post('/login', loginRule, errValidator, login);
user.post('/register', userRegRules, createUser);
