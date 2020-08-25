/* tslint:disable:variable-name */
import * as bcrypt from 'bcrypt';
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores details of user info';

export const definitions = {
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String, enum: ['ADMIN', 'EMPLOYEE'] },
  updatedAt: { type: Date },
  createdAt: { type: Date },
};

const userSchema: Schema = new Schema(definitions);

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user: any = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = async function(candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongooseModel('User', userSchema);
