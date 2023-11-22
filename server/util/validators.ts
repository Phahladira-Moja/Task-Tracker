import Joi from "joi";
import { ResponseModel } from "../models/ResponseModel";

const userIdSchema = Joi.object().keys({
  id: Joi.string().min(4).required(),
});

const authSchema = Joi.object().keys({
  username: Joi.string()
    .regex(/^[a-zA-Z0-9](?!.*[._]{2})[a-zA-Z0-9._]+[a-zA-Z0-9]$/)
    .min(3)
    .max(30)
    .required(),
  password: Joi.string().min(4).required(),
});

const taskSchema = Joi.object().keys({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).max(50).required(),
  priority: Joi.string().valid("LOW", "MEDIUM", "HIGH").required(),
});

export function validateAuth(username: any, password: any): boolean {
  const result = authSchema.validate({
    username: username,
    password: password,
  });

  if (result.error) return false;

  return true;
}

export function validateTask(
  title: any,
  description: any,
  priority: any
): boolean {
  const result = taskSchema.validate({
    title: title,
    description: description,
    priority: priority,
  });

  if (result.error) return false;

  return true;
}

export function validateUserId(userId: any): boolean {
  const result = taskSchema.validate({
    id: userId,
  });

  if (result.error) return false;

  return true;
}
