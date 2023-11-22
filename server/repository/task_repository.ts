import { prisma } from "../config/prisma_config";
import { STATUS_CODE_ENUM } from "../constants";
import { ResponseModel } from "../models/ResponseModel";
import { CreateTask, SafeTask } from "../models/Task";
import ITaskRepository from "./task_repository_interface";

export default class TaskRepository implements ITaskRepository {
  async getTasks(id: string): Promise<SafeTask[] | ResponseModel> {
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

      return safeTasks;
    } catch (error) {
      //! TODO: ADD LOGGER
      console.log(error);

      const errorModel: ResponseModel = {
        code: STATUS_CODE_ENUM.INTERNAL_SERVER,
        message:
          "An unexpected error occurred while trying to get Tasks. Please try again.",
      };

      return errorModel;
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

      const successModel: ResponseModel = {
        code: STATUS_CODE_ENUM.OK_STATUS,
        message: "Task created successfully.",
      };

      return successModel;
    } catch (error) {
      //! TODO: ADD LOGGER
      console.log(error);

      const errorModel: ResponseModel = {
        code: STATUS_CODE_ENUM.INTERNAL_SERVER,
        message:
          "An unexpected error occurred while trying to create a task. Please try again.",
      };

      return errorModel;
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

      const successModel: ResponseModel = {
        code: STATUS_CODE_ENUM.OK_STATUS,
        message: "Task updated successfully.",
      };

      return successModel;
    } catch (error) {
      //! TODO: ADD LOGGER
      console.log(error);

      const errorModel: ResponseModel = {
        code: STATUS_CODE_ENUM.INTERNAL_SERVER,
        message:
          "An unexpected error occurred while trying to update a task. Please try again.",
      };

      return errorModel;
    }
  }

  async deleteTask(id: string): Promise<ResponseModel> {
    try {
      await prisma.task.delete({
        where: {
          id: id,
        },
      });

      const successModel: ResponseModel = {
        code: STATUS_CODE_ENUM.OK_STATUS,
        message: "Task deleted successfully.",
      };

      return successModel;
    } catch (error) {
      //! TODO: ADD LOGGER
      console.log(error);

      const errorModel: ResponseModel = {
        code: STATUS_CODE_ENUM.INTERNAL_SERVER,
        message:
          "An unexpected error occurred while trying to delete a task. Please try again.",
      };

      return errorModel;
    }
  }
}
