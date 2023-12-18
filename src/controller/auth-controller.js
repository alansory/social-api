import authService from "../service/auth-service.js";

const register = async(req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({
      data: result,
      status_code: 201
    })
  } catch (error) {
    next(error);
  }
}

const login = async(req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json({
      data: result,
      status_code: 200  
    }) 
    
  }catch (error) {
    next(error);
  }
}

export default {
  register,
  login
}