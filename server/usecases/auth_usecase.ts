import IAuthRepository from "../repository/auth_repository_interface";

export function makeLoginUseCase(
  authRepo: IAuthRepository,
  validateAuth: (username: any, password: any) => boolean
) {
  return async function makeLogin(username: any, password: any) {
    const isValid = validateAuth(username, password);

    if (!isValid) {
      //! TODO: RETURN RESPONSE MODEL
    }

    return await authRepo.login(username, password);
  };
}

export function makeSignUpUseCase(
  authRepo: IAuthRepository,
  validateAuth: (username: any, password: any) => boolean
) {
  return async function makeLogin(username: any, password: any) {
    const isValid = validateAuth(username, password);

    if (!isValid) {
      //! TODO: RETURN RESPONSE MODEL
    }

    return await authRepo.signup(username, password);
  };
}
