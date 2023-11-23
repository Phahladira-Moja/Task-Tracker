import express from "express";
import { ResponseModel } from "../models/ResponseModel";

export function makeLogin({ loginUseCase }: any) {
  return async function login(req: express.Request, res: express.Response) {
    const { username, password } = req.body;

    const headers = {
      "Content-Type": "application/json",
    };

    const result: ResponseModel = await loginUseCase(username, password);

    return res
      .status(result.code)
      .header(headers)
      .json({
        ...result,
      });
  };
}

export function makeSignup({ signUpUseCase }: any) {
  return async function signup(req: express.Request, res: express.Response) {
    const { username, password } = req.body;

    const headers = {
      "Content-Type": "application/json",
    };

    const result: ResponseModel = await signUpUseCase(username, password);

    return res
      .status(result.code)
      .header(headers)
      .json({
        ...result,
      });
  };
}
