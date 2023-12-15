import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validate } from "../validation/validation.js";
import { registerValidation } from "../validation/auth-validation.js";
import { prismaClient } from "../application/database.js";


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

export default {
  register
}