import { CreateTask } from "../models/Task";
import ITaskRepository from "../repository/task_repository_interface";

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
      //! TODO: RETURN RESPONSE MODEL
    }

    if (!isValid) {
      //! TODO: RETURN RESPONSE MODEL
    }

    const task: CreateTask = {
      title: title,
      description: description,
      priority: priority,
    };

    return await taskRepo.createTask(userId, priority);
  };
}

export function makeUpdateTaskUseCase(
  taskRepo: ITaskRepository,
  validateUserId: (userId: any) => boolean,
  validateTask: (title: any, description: any, priority: any) => boolean
) {
  return async function makeUpdateTask(
    userId: string,
    title: any,
    description: any,
    priority: any
  ) {
    const isValidId = validateUserId(userId);
    const isValid = validateTask(title, description, priority);

    if (!isValidId) {
      //! TODO: RETURN RESPONSE MODEL
    }

    if (!isValid) {
      //! TODO: RETURN RESPONSE MODEL
    }

    const task: CreateTask = {
      title: title,
      description: description,
      priority: priority,
    };

    return await taskRepo.updateTask(userId, priority);
  };
}

export function makeGetTasksUseCase(
  taskRepo: ITaskRepository,
  validateUserId: (userId: any) => boolean
) {
  return async function makeGetTasks(userId: unknown) {
    const isValidId = validateUserId(userId);

    if (!isValidId) {
      //! TODO: RETURN RESPONSE MODEL
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
      //! TODO: RETURN RESPONSE MODEL
    }

    return await taskRepo.deleteTask(id as string);
  };
}
