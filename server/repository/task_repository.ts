import { prisma } from "../config/prisma_config";
import { STATUS_CODE_ENUM } from "../constants";
import { ResponseModel } from "../models/ResponseModel";
import { CreateTask, SafeTask } from "../models/Task";
import createResponseModel from "../util/create_response_model";
import ITaskRepository from "./task_repository_interface";

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
        ...task,
        createdAt: task.createdAt.toISOString(),
        updatedAt: task.updatedAt.toISOString(),
      }));

      return createResponseModel(
        STATUS_CODE_ENUM.OK_STATUS,
        "Successfully retrieved the list of tasks.",
        "",
        safeTasks
      );
    } catch (error) {
      //! TODO: ADD LOGGER
      console.log(error);

      return createResponseModel(
        STATUS_CODE_ENUM.INTERNAL_SERVER,
        "An unexpected error occurred while trying to login. Please try again.",
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

      return createResponseModel(
        STATUS_CODE_ENUM.OK_STATUS,
        "Task created successfully.",
        ""
      );
    } catch (error) {
      //! TODO: ADD LOGGER
      console.log(error);

      return createResponseModel(
        STATUS_CODE_ENUM.INTERNAL_SERVER,
        "An unexpected error occurred while trying to login. Please try again.",
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

      return createResponseModel(
        STATUS_CODE_ENUM.OK_STATUS,
        "Task updated successfully.",
        ""
      );
    } catch (error) {
      //! TODO: ADD LOGGER
      console.log(error);

      return createResponseModel(
        STATUS_CODE_ENUM.INTERNAL_SERVER,
        "An unexpected error occurred while trying to login. Please try again.",
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

      return createResponseModel(
        STATUS_CODE_ENUM.OK_STATUS,
        "Task deleted successfully.",
        ""
      );
    } catch (error) {
      //! TODO: ADD LOGGER
      console.log(error);

      return createResponseModel(
        STATUS_CODE_ENUM.INTERNAL_SERVER,
        "An unexpected error occurred while trying to login. Please try again.",
        "Internal Server Error"
      );
    }
  }
}
