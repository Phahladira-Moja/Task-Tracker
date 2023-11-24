import express from "express";
import { verify } from "jsonwebtoken";
import { STATUS_CODE_ENUM } from "../constants";

interface JwtPayload {
  userId: string;
  username: string;
  // Add other claims from your JWT payload
}

export function checkToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let token = req.get("authorization");

  if (token) {
    token = token.slice(7);

    const jwt_key = process.env.JWT_KEY;
    verify(token, `${jwt_key}`, (err, decoded) => {
      if (err) {
        return res.status(STATUS_CODE_ENUM.UNAUTHORIZED).json({
          code: STATUS_CODE_ENUM.UNAUTHORIZED,
          error: "Invalid Token",
          message: "Access denied! Invalid token provided",
        });
      } else {
        // Token verified successfully
        const data = decoded as JwtPayload;

        req.body = {
          ...req.body,
          ...data,
        };
        next();
      }
    });
  } else {
    return res.status(STATUS_CODE_ENUM.UNAUTHORIZED).json({
      code: STATUS_CODE_ENUM.UNAUTHORIZED,
      error: "Unauthorized",
      message: "Access denied! unauthorized user",
    });
  }
}
