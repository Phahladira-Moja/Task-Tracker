import { ErrorModel } from "../models/ErrorModel";
import { User } from "../models/User";

export default interface IAuthRepository {
  login(username: string, password: string): Promise<User | ErrorModel>;
  signup(username: string, password: string): Promise<User | ErrorModel>;
}
