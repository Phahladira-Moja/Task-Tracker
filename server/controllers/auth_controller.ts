import express from "express";
import { ResponseModel } from "../models/ResponseModel";

export function makeLogin({ loginUseCase }: any) {
  return async function login(req: express.Request, res: express.Response) {
    const headers = {
      "Content-Type": "application/json",
    };

    const result: ResponseModel = await loginUseCase();

    return res.status(result.code).json({
      ...result,
    });
  };
}

export function makeSignup({ signupUseCase }: any) {
  return async function signup(req: express.Request, res: express.Response) {
    const headers = {
      "Content-Type": "application/json",
    };

    const result: ResponseModel = await signupUseCase();

    return res.status(result.code).json({
      ...result,
    });
  };
}
