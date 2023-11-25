import { prisma } from "../config/prisma_config";
import { STATUS_CODE_ENUM } from "../constants";
import { ResponseModel } from "../models/ResponseModel";
import { CreateTask, SafeTask } from "../models/Task";
import createResponseModel from "../util/create_response_model";
import ITaskRepository from "./task_repository_interface";
import logger from "../util/logger";

export default class TaskRepository implements ITaskRepository {
  async getTasks(id: string): Promise<ResponseModel> {
    try {
      const tasks = await prisma.task.findMany({
        where: {
          userId: id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const safeTasks: SafeTask[] = tasks.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
      }));

      logger.info("Endpoint GET /tasks hit successfully");
      return createResponseModel(
        STATUS_CODE_ENUM.OK_STATUS,
        "Successfully retrieved the list of tasks.",
        "",
        safeTasks
      );
    } catch (error) {
      logger.error(`Error in GET /tasks: ${error}`);
      return createResponseModel(
        STATUS_CODE_ENUM.INTERNAL_SERVER,
        "An unexpected error occurred while trying to retrieve tasks. Please try again.",
        "Internal Server Error"
      );
    }
  }

  async createTask(userId: string, task: CreateTask): Promise<ResponseModel> {
    try {
      await prisma.task.create({
        data: {
          title: task.title,
          description: task.description,
          priority: task.priority,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      logger.info("Endpoint POST /tasks hit successfully");
      return createResponseModel(
        STATUS_CODE_ENUM.OK_STATUS,
        "Task created successfully.",
        ""
      );
    } catch (error) {
      logger.error(`Error in POST /tasks: ${error}`);

      return createResponseModel(
        STATUS_CODE_ENUM.INTERNAL_SERVER,
        "An unexpected error occurred while trying to retrieve tasks. Please try again.",
        "Internal Server Error"
      );
    }
  }

  async updateTask(id: string, task: CreateTask): Promise<ResponseModel> {
    try {
      await prisma.task.update({
        where: {
          id: id,
        },
        data: {
          title: task.title,
          description: task.description,
          priority: task.priority,
        },
      });

      logger.info("Endpoint PATCH /tasks/:id hit successfully");
      return createResponseModel(
        STATUS_CODE_ENUM.OK_STATUS,
        "Task updated successfully.",
        ""
      );
    } catch (error) {
      logger.error(`Error in PATCH /tasks/:id: ${error}`);

      return createResponseModel(
        STATUS_CODE_ENUM.INTERNAL_SERVER,
        "An unexpected error occurred while trying to retrieve tasks. Please try again.",
        "Internal Server Error"
      );
    }
  }

  async deleteTask(id: string): Promise<ResponseModel> {
    try {
      await prisma.task.delete({
        where: {
          id: id,
        },
      });

      logger.info("Endpoint DELETE /tasks/:id hit successfully");
      return createResponseModel(
        STATUS_CODE_ENUM.OK_STATUS,
        "Task deleted successfully.",
        ""
      );
    } catch (error) {
      logger.error(`Error in DELETE /tasks/:id: ${error}`);

      return createResponseModel(
        STATUS_CODE_ENUM.INTERNAL_SERVER,
        "An unexpected error occurred while trying to retrieve tasks. Please try again.",
        "Internal Server Error"
      );
    }
  }
}
