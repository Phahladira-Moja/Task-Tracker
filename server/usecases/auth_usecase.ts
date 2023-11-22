import { STATUS_CODE_ENUM } from "../constants";
import { ResponseModel } from "../models/ResponseModel";
import { User } from "../models/User";
import IAuthRepository from "../repository/auth_repository_interface";
import createResponseModel from "../util/create_response_model";

export function makeLoginUseCase(
  authRepo: IAuthRepository,
  validateAuth: (username: any, password: any) => boolean
) {
  return async function makeLogin(
    username: any,
    password: any
  ): Promise<ResponseModel> {
    const isValid = validateAuth(username, password);

    if (!isValid) {
      //! TODO: LOG
      return createResponseModel(
        STATUS_CODE_ENUM.BAD_REQUEST,
        "The parameters passed are invalid. Either the username or the password.",
        "Validation Error"
      );
    }

    return await authRepo.login(username, password);
  };
}

export function makeSignUpUseCase(
  authRepo: IAuthRepository,
  validateAuth: (username: any, password: any) => boolean
) {
  return async function makeLogin(
    username: any,
    password: any
  ): Promise<ResponseModel> {
    const isValid = validateAuth(username, password);

    if (!isValid) {
      //! TODO: LOG
      return createResponseModel(
        STATUS_CODE_ENUM.BAD_REQUEST,
        "The parameters passed are invalid. Either the username or the password.",
        "Validation Error"
      );
    }

    return await authRepo.signup(username, password);
  };
}
