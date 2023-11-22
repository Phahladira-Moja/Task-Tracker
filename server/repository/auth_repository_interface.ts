import { ResponseModel } from "../models/ResponseModel";
import { User } from "../models/User";

export default interface IAuthRepository {
  login(username: string, password: string): Promise<ResponseModel>;
  signup(username: string, password: string): Promise<ResponseModel>;
}
