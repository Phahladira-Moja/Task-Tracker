import { ResponseModel } from "../models/ResponseModel";
import { SafeTask } from "../models/Task";
import { User } from "../models/User";

export default function createResponseModel(
  statusCode: number,
  message: string,
  error: string,
  body?: User | SafeTask | SafeTask[],
  token?: string
): ResponseModel {
  const errorModel: ResponseModel = {
    code: statusCode,
    message: message,
    error,
    body,
    token,
  };

  return errorModel;
}
