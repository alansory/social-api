import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validate } from "../validation/validation.js";
import { forgotValidation, loginValidation, registerValidation, resetPasswordValidation } from "../validation/auth-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";


const register = async(request) =>{
  const user = validate(registerValidation, request);
  user.password = await bcrypt.hash(user.password, 10);
  const newUser = await prismaClient.user.create({
    data: user
  });

  const token = generateAccessToken(user)
  const result = {
    access_token: token,
    data: newUser
  }
  return result;
}

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRE });
}

const login = async(request) =>{
  const loginRequest = validate(loginValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      email: loginRequest.email
    }
  });

  if (!user) {
    throw new ResponseError(401, "Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
  if (!isPasswordValid) {
    throw new ResponseError(401, "Invalid credentials");
  }

  exclude(user, 'password')
  const token = generateAccessToken(user)
  const result = {
    access_token: token,
    data: user,
  }
  return result;
}

const forgotPassword = async(request) => {
  const validateRequest = validate(forgotValidation, request)

  const user = await prismaClient.user.findUnique({
    where: {
      email: validateRequest.email
    }
  });

  if (!user) {
    throw new ResponseError(401, "User not found");
  }
  const token = generateAccessToken(user)
  const result = {
    token: token,
  }
  return result;
} 

const resetPassword = async(request) => {
  const { token } = request.params;
  const validateRequest = validate(resetPasswordValidation, request.body)

  const validPassword = validateRequest.password==validateRequest.confirm_password

  if (!validPassword) {
    throw new ResponseError(401, "Invalid password");
  }
  const { email } = jwt.verify(token, process.env.TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRE })
  const newPassword = await bcrypt.hash(validateRequest.password,10)
  const user = await prismaClient.user.update({
    where: { email: email },
    data: {
      password: newPassword,
    },
  });
  const result = {
    data: user,
  }
  return result;
} 

function exclude(user, ...keys) {
  for (let key of keys) {
    delete user[key]
  }
  return user
}

export default {
  register,
  login,
  forgotPassword,
  resetPassword,
}