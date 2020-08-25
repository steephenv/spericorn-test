import { Promise } from 'bluebird';
import { get as getConfig } from 'config';
import { sign as jwtSign, verify as jwtVerify } from 'jsonwebtoken';

const SECRET_KEY: string = getConfig('app.jwt.SecretKey');
const ACCESS_TOKEN_EXPIRY_TIME: string = getConfig(
  'app.jwt.accessTokenExpiryTime',
);

export class Jwt {
  // function to make jwt
  public static sign(payload: any) {
    return new Promise((resolve, reject) => {
      jwtSign(
        payload,
        SECRET_KEY,
        {
          expiresIn: ACCESS_TOKEN_EXPIRY_TIME,
        },
        (err, token) => {
          if (err) {
            return reject(err);
          }
          resolve(token);
        },
      );
    });
  }

  // function to verify jwt
  public static verify(token: string) {
    return new Promise((resolve, reject) => {
      jwtVerify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
          return reject(err);
        }
        resolve(decoded);
      });
    });
  }
}
