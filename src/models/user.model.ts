import mongoose from "mongoose";
import { encrypt } from "../utils/encryption";

export interface User {
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  profilePicture: string;
  isActive: boolean;
  activationCode: string;
}
// Declare Schema from mongoose
const Schema = mongoose.Schema;

// Skema user
const userSchema = new Schema<User>(
  {
    fullName: {
      type: Schema.Types.String,
      required: true,
    },
    username: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    role: {
      type: Schema.Types.String,
      required: true,
    },
    profilePicture: {
      type: Schema.Types.String,
      default: "user.jpg",
      required: true,
    },
    isActive: {
      type: Schema.Types.Boolean,
      default: false,
      required: true,
    },
    activationCode: {
      type: Schema.Types.String,
    },
  },
  {
    timestamps: true,
  }
);

// hide response data password
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

// Enkripsi password
userSchema.pre("save", function (next) {
  const user = this as User;
  user.password = encrypt(user.password);
  next();
});

// Save user
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
