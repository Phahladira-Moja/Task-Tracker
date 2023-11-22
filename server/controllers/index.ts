import { makeLogin, makeSignup } from "./auth_controller";

const login = makeLogin({});
const signup = makeSignup({});

export const authController = Object.freeze({
  login,
  signup,
});
