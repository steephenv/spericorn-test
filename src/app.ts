import * as bodyParser from 'body-parser';
import { get as getConfig } from 'config';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import * as lme from 'lme';
import * as favicon from 'serve-favicon';

// import {RequestError, RequestErrorType} from 'issue-maker/dist/src/error-types/express-request-error';
// init db
import { mongooseConnectionPromise, mongoose } from './db.init';

import { apis } from './routes';
export const app = express();

const morganEnabled: boolean = getConfig('app.combinedLogger');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
  cors({
    origin: '*',
  }),
);

// un-comment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

if (morganEnabled) {
  app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

export { mongoose, mongooseConnectionPromise }; // exporting for quick access in tests

mongooseConnectionPromise
  .then(() => {
    lme.i(`> database connected:${getConfig('database.url')}`);
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */

    // if this is a forked process, notify parent when the server is ready
    if (process.send) {
      lme.i('sending ready');
      process.send({ msg: 'ready' });
      process.on('message', msg => {
        if (typeof msg === 'object' && msg.msg === 'terminate') {
          console.log('terminating server upon parent request. bye :)'); // tslint:disable-line:no-console
          process.exit(msg.statusCode);
        }
      });
    }
  })
  .catch(err => {
    // tslint:disable-next-line
    lme.e(
      '> MongoDB connection error. Please make sure MongoDB is running. ' + err,
    );
    process.exit(1);
  });

app.use('/v1', apis);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const errVar = {
    status: '404',
    message: 'page not found',
    statusCode: '404',
  };
  next(errVar);
});

// error handler
const requestErrHandler: express.ErrorRequestHandler = (
  err: any,
  req,
  res,
  next,
) => {
  // if (err.statusCode >= 500) {
  // logger.error(
  //   `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
  //     req.method
  //   } - ${req.ip}`,
  // );

  if (req.xhr) {
    // remove sensitive err details
    if (err.statusCode >= 500) {
      return res.status(err.statusCode).send({
        status: 'failed',
        message: err.message,
        statusCode: err.statusCode,
        remarks: 'This incident has reported.',
      });
    } else {
      return res.status(err.statusCode).send(err);
    }
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.statusCode);
  res.render('error');
};

app.use(requestErrHandler);
