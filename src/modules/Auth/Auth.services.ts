import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TLoginUser, } from "./Auth.interface";
import config from "../../config";
import bcryptJs from 'bcryptjs';
import { createToken } from "./Auth.utils";
import UserModel from "../User/User.model";

type TSignupPayload = {
  name: string;
  email: string;
  password: string;
  role?: "admin" | "user";
};

const loginUser = async (payload: TLoginUser) => {
    const user = await UserModel.findOne({ email: payload.email });
    if (user?.isBlocked) {
      throw new AppError(httpStatus.NOT_FOUND, 'User is blocked , Please contact admin');
    }
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    } else {

      if (!payload.password) {
        throw new  AppError(httpStatus.NOT_FOUND, 'Password is required');
      }
  
      if (payload.password) {
        const isPasswordMatched = await bcryptJs.compare(
          payload.password,
          user.password,
        );
  
        if (!isPasswordMatched) {
          throw new AppError(httpStatus.NOT_FOUND, 'Password Incorrect!');
        }
        const jwtPayload = {
          name: user.name,
          email: user.email,
          role: user.role,
          _id: user._id,
         
        };
    
        const accessToken = createToken(
          jwtPayload,
          config.jwt_access_secret as string,
          config.jwt_access_expires_in as string,
        );
    
        const refreshToken = createToken(
          jwtPayload,
          config.jwt_refresh_secret as string,
          config.jwt_refresh_expires_in as string,
        );
    
        return {
          user: {
            name: user.name,
            email: user.email,
            role: user.role,
            _id: user._id,
          },
          accessToken,
          refreshToken,
        };
        
      }

 

    }
  
  };

export const signupUser = async (payload: TSignupPayload) => {
  const { name, email, password } = payload;


  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new AppError(httpStatus.CONFLICT, "Email already registered");
  }

  // role based on email domain
   const adminDomain = "@arnifi.com"

  const isAdmin = payload.email.toLowerCase().endsWith(adminDomain);

  const role = isAdmin ? "admin" : "user";

  // hash password
  const hashedPassword = await bcryptJs.hash(password,10);

  // create new user
  const newUser = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  // prepare JWT payload
  const jwtPayload = {
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    _id: newUser._id,
  };

  // generate tokens
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    user: {
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      _id: newUser._id,
    },
    accessToken,
    refreshToken,
  };
};


  export const AuthServices = {
    loginUser,
    signupUser,
  }
