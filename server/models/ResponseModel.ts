import { SafeTask } from "./Task";
import { User } from "./User";

export type ResponseModel = {
  code: number;
  error?: string;
  message: string;
  body?: User | SafeTask | SafeTask[];
  token?: string;
};
