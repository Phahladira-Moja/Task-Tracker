import { STATUS_CODE_ENUM } from "../constants";
import { CreateTask } from "../models/Task";
import ITaskRepository from "../repository/task_repository_interface";
import createResponseModel from "../util/create_response_model";

export function makeCreateTaskUseCase(
  taskRepo: ITaskRepository,
  validateUserId: (userId: any) => boolean,
  validateTask: (title: any, description: any, priority: any) => boolean
) {
  return async function makeCreateTask(
    userId: string,
    title: any,
    description: any,
    priority: any
  ) {
    const isValidId = validateUserId(userId);
    const isValid = validateTask(title, description, priority);

    if (!isValidId) {
      //! TODO: LOG
      return createResponseModel(
        STATUS_CODE_ENUM.BAD_REQUEST,
        "The user ID passed in is invalid.",
        "Validation Error"
      );
    }

    if (!isValid) {
      //! TODO: LOG
      return createResponseModel(
        STATUS_CODE_ENUM.BAD_REQUEST,
        "The parameters passed are invalid. Either the title, description or priority level.",
        "Validation Error"
      );
    }

    const task: CreateTask = {
      title: title,
      description: description,
      priority: priority,
    };

    return await taskRepo.createTask(userId, task);
  };
}

export function makeUpdateTaskUseCase(
  taskRepo: ITaskRepository,
  validateUserId: (userId: any) => boolean,
  validateTask: (title: any, description: any, priority: any) => boolean
) {
  return async function makeUpdateTask(
    taskId: string,
    title: any,
    description: any,
    priority: any
  ) {
    const isValidId = validateUserId(taskId);
    const isValid = validateTask(title, description, priority);

    if (!isValidId) {
      //! TODO: LOG
      return createResponseModel(
        STATUS_CODE_ENUM.BAD_REQUEST,
        "The user ID passed in is invalid.",
        "Validation Error"
      );
    }

    if (!isValid) {
      //! TODO: LOG
      return createResponseModel(
        STATUS_CODE_ENUM.BAD_REQUEST,
        "The parameters passed are invalid. Either the title, description or priority level.",
        "Validation Error"
      );
    }

    const task: CreateTask = {
      title: title,
      description: description,
      priority: priority,
    };

    return await taskRepo.updateTask(taskId, task);
  };
}

export function makeGetTasksUseCase(
  taskRepo: ITaskRepository,
  validateUserId: (userId: any) => boolean
) {
  return async function makeGetTasks(userId: unknown) {
    const isValidId = validateUserId(userId);

    if (!isValidId) {
      //! TODO: LOG
      return createResponseModel(
        STATUS_CODE_ENUM.BAD_REQUEST,
        "The user ID passed in is invalid.",
        "Validation Error"
      );
    }

    return await taskRepo.getTasks(userId as string);
  };
}

export function makeDeleteTasksUseCase(
  taskRepo: ITaskRepository,
  validateUserId: (id: any) => boolean
) {
  return async function makeDeleteTasks(id: unknown) {
    const isValidId = validateUserId(id);

    if (!isValidId) {
      //! TODO: LOG
      return createResponseModel(
        STATUS_CODE_ENUM.BAD_REQUEST,
        "The task ID passed in is invalid.",
        "Validation Error"
      );
    }

    return await taskRepo.deleteTask(id as string);
  };
}
