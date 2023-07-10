import mongoose, { HookNextFunction } from 'mongoose';
import { IUser } from '../types';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUser>(
  {
    _id: {
      type: String,
      default: uuid
    },
    userName: {
      type: String,
      require: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 20
    },
    loggedIn: {
      type: Boolean,
      default: false
    },
    currentLoginTime: {
      type: Date,
      default: Date.now
    },
    loginCounter: {
      type: Number,
      default: 0
    },
    lastLoginTime: {
      type: Date,
      default: Date.now
    },
    userAgent: {
      type: String
    },
    userIp: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false }
);

UserSchema.pre('save', function (next: HookNextFunction) {
  if (!this.isModified('password')) return next();

  bcrypt.hash(this.password, 10, (err: any, passHash: string) => {
    if (err) return next(err);
    this.password = passHash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err: unknown, isMatch: boolean) => {
    if (err) {
      return cb(err);
    } else {
      if (!isMatch) {
        return cb(null, isMatch);
      }
      return cb(null, this);
    }
  });
};

export default mongoose.model('User', UserSchema);
