import cors from 'cors'
import express from "express";
import authController from "../controller/auth-controller.js";

const publicRouter = new express.Router();

// cors access handler
publicRouter.use(cors())
publicRouter.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

publicRouter.get('/', (req, res) => {
  res.send("Starlet API");
});

publicRouter.post('/register', authController.register)
publicRouter.post('/login', authController.login)
publicRouter.post('/forgot-password', authController.forgotPassword)
publicRouter.post('/reset-password/:token', authController.resetPassword)

export {
  publicRouter
}