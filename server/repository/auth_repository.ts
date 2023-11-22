import { User } from "../models/User";
import { prisma } from "../config/prisma_config";
import IAuthRepository from "./auth_repository_interface";
import { ResponseModel } from "../models/ResponseModel";
import { STATUS_CODE_ENUM } from "../constants";
import * as bcrypt from "bcryptjs";
export default class AuthRepository implements IAuthRepository {
  constructor() {}

  async login(
    username: string,
    password: string
  ): Promise<User | ResponseModel> {
    try {
      const userExists = await prisma.user.findUnique({
        where: { username: username },
      });

      if (!userExists) {
        const errorModel: ResponseModel = {
          code: STATUS_CODE_ENUM.NOT_FOUND,
          message: "User doesn't exists",
        };

        return errorModel;
      }

      //! TODO: ADD BCRYPT SERVICE
      const isCorrect = await bcrypt.compare(password, userExists.password);

      if (!isCorrect) {
        const errorModel: ResponseModel = {
          code: STATUS_CODE_ENUM.UNAUTHORIZED,
          message: "Incorrect username or password",
        };

        return errorModel;
      }

      let user: User = {
        id: userExists.id,
        username: userExists.username,
      };

      return user;
    } catch (error) {
      //! TODO: ADD LOGGER
      console.log(error);

      const errorModel: ResponseModel = {
        code: STATUS_CODE_ENUM.INTERNAL_SERVER,
        message:
          "An unexpected error occurred while trying to login. Please try again.",
      };

      return errorModel;
    }
  }

  async signup(
    username: string,
    password: string
  ): Promise<User | ResponseModel> {
    try {
      const userExists = await prisma.user.findUnique({
        where: { username: username },
      });

      if (!userExists) {
        const hashPassword = await bcrypt.hash(password, 12);

        const newUser = await prisma.user.create({
          data: { username: username, password: hashPassword },
        });

        let user: User = {
          id: newUser.id,
          username: newUser.username,
        };

        return user;
      }

      const errorModel: ResponseModel = {
        code: STATUS_CODE_ENUM.RESOURCE_EXISTS,
        message: "User already exists",
      };

      return errorModel;
    } catch (error) {
      //! TODO: ADD LOGGER
      console.log(error);

      const errorModel: ResponseModel = {
        code: STATUS_CODE_ENUM.INTERNAL_SERVER,
        message:
          "An unexpected error occurred while trying to sign-up. Please try again.",
      };

      return errorModel;
    }
  }
}
