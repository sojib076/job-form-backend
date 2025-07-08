import httpStatus from "http-status";
import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./Auth.services";

const loginUser = asyncHandler(async (req, res) => {
 
  const result = await AuthServices.loginUser(req.body);

  if (!result) {

  return sendResponse(res, {
    statusCode: httpStatus.NOT_FOUND,
    success: false,
    message: 'User not found!',
    data: {},
  });
   
  }
 
  const { refreshToken, accessToken } = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully!',
    data: {
      user: result.user,
      accessToken,
      refreshToken,
    },
  });
});

const signupUser = asyncHandler(async (req, res) => {
  const result = await AuthServices.signupUser(req.body);

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.CONFLICT,
      success: false,
      message: 'Email already registered',
      data: {},
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User is created successfully!',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  signupUser,
};