import { Promise as BluePromise } from 'bluebird';
import { get as configGet } from 'config';
import mongoose = require('mongoose');
import * as lme from 'lme';

// Connect to MongoDB
const MONGO_URI: string = configGet('database.url');
lme.i('> connecting to ' + MONGO_URI);

// Promisifying all mongoose methods
mongoose.Promise = BluePromise;

export const mongooseConnectionPromise = mongoose.connect(MONGO_URI);

// If the Node process ends, close the Mongoose connection
// process.on('SIGINT', () => {
//   mongoose.disconnect().then(() => {
//     // tslint:disable-next-line
//     console.log('Mongoose connection disconnected through app termination');
//     process.exit(1);
//   });
// });

export { mongoose };
