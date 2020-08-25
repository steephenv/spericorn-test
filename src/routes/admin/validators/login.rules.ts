import { body } from 'express-validator/check';

export const loginRule = [
  body('username')
    .exists()
    .withMessage('Invalid username'),
  body('password')
    .exists()
    .withMessage('Invalid password'),
];
