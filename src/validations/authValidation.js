import Joi from 'joi';

export const registerSchema = Joi.object({
userName: Joi.string().required(),  
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),  
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),  
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
