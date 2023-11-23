import { ResponseModel } from "../models/ResponseModel";
import { SafeTask } from "../models/Task";
import { User } from "../models/User";

export default function createResponseModel(
  statusCode: number,
  message: string,
  error: string,
  body?: User | SafeTask | SafeTask[]
): ResponseModel {
  const errorModel: ResponseModel = {
    code: statusCode,
    message: message,
    error,
    body,
  };

  return errorModel;
}
