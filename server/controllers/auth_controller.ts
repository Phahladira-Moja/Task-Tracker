import express from "express";

export function makeLogin({ loginUseCase }: any) {
  return async function login(req: express.Request, res: express.Response) {
    const headers = {
      "Content-Type": "application/json",
    };

    const result = await loginUseCase();

    return result;
  };
}

export function makeSignup({ signupUseCase }: any) {
  return async function login(req: express.Request, res: express.Response) {
    const headers = {
      "Content-Type": "application/json",
    };

    const result = await signupUseCase();

    return result;
  };
}
