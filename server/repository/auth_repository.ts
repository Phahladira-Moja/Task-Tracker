import { User } from "../models/User";
import { prisma } from "../config/prisma_config";
import IAuthRepository from "./auth_repository_interface";
import { ResponseModel } from "../models/ResponseModel";
import { STATUS_CODE_ENUM } from "../constants";
import * as bcrypt from "bcryptjs";
import createResponseModel from "../util/create_response_model";
import { sign } from "jsonwebtoken";
import logger from "../util/logger";

export default class AuthRepository implements IAuthRepository {
  constructor() {}

  async login(username: string, password: string): Promise<ResponseModel> {
    try {
      const userExists = await prisma.user.findUnique({
        where: { username: username },
      });

      if (!userExists) {
        logger.error(
          `Error in /users/login: The requested user does not exist.`
        );
        return createResponseModel(
          STATUS_CODE_ENUM.NOT_FOUND,
          "The requested user does not exist.",
          "User Not Found"
        );
      }

      const isCorrect = await bcrypt.compare(password, userExists.password);

      if (!isCorrect) {
        logger.error(`Error in /users/login: Incorrect username or password.`);
        return createResponseModel(
          STATUS_CODE_ENUM.UNAUTHORIZED,
          "Incorrect username or password.",
          "Unauthorized"
        );
      }

      let user: User = {
        id: userExists.id,
        username: userExists.username,
      };

      const jwt_key = process.env.JWT_KEY;
      const jsonToken = sign({ user: user }, `${jwt_key}`, {
        expiresIn: "10m",
      });

      logger.info("Endpoint /users/login: hit successfully");
      return createResponseModel(
        STATUS_CODE_ENUM.OK_STATUS,
        "Successful login.",
        "",
        user,
        jsonToken
      );
    } catch (error) {
      logger.error(`Error in /users/login: ${error}`);

      return createResponseModel(
        STATUS_CODE_ENUM.INTERNAL_SERVER,
        "An unexpected error occurred while trying to login. Please try again.",
        "Internal Server Error"
      );
    }
  }

  async signup(username: string, password: string): Promise<ResponseModel> {
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

        const jwt_key = process.env.JWT_KEY;
        const jsonToken = sign({ user: user }, `${jwt_key}`, {
          expiresIn: "10m",
        });

        logger.info("Endpoint /users/signup: hit successfully");
        return createResponseModel(
          STATUS_CODE_ENUM.OK_STATUS,
          "Successful registration.",
          "",
          user,
          jsonToken
        );
      }

      const errorModel: ResponseModel = {
        code: STATUS_CODE_ENUM.RESOURCE_EXISTS,
        message: "User already exists",
      };

      logger.error(`Error in /users/signup: User already exists.`);
      return createResponseModel(
        STATUS_CODE_ENUM.RESOURCE_EXISTS,
        "User already exists",
        "Conflict"
      );
    } catch (error) {
      logger.error(`Error in /users/signup: ${error}`);

      return createResponseModel(
        STATUS_CODE_ENUM.INTERNAL_SERVER,
        "An unexpected error occurred while trying to sign up. Please try again.",
        "Internal Server Error"
      );
    }
  }
}
