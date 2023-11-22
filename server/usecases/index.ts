import AuthRepository from "../repository/auth_repository";
import IAuthRepository from "../repository/auth_repository_interface";
import TaskRepository from "../repository/task_repository";
import ITaskRepository from "../repository/task_repository_interface";
import { validateAuth, validateTask, validateUserId } from "../util/validators";
import { makeLoginUseCase, makeSignUpUseCase } from "./auth_usecase";
import {
  makeCreateTaskUseCase,
  makeUpdateTaskUseCase,
  makeGetTasksUseCase,
  makeDeleteTasksUseCase,
} from "./task_usecase";

const authRepo: IAuthRepository = new AuthRepository();
const taskRepo: ITaskRepository = new TaskRepository();

const loginUseCase = makeLoginUseCase(authRepo, validateAuth);
const signUpUseCase = makeSignUpUseCase(authRepo, validateAuth);

const getTaskUseCase = makeGetTasksUseCase(taskRepo, validateUserId);
const deleteTaskUseCase = makeDeleteTasksUseCase(taskRepo, validateUserId);
const createTaskUseCase = makeCreateTaskUseCase(
  taskRepo,
  validateUserId,
  validateTask
);
const updateTaskUseCase = makeUpdateTaskUseCase(
  taskRepo,
  validateUserId,
  validateTask
);

export const authService = Object.freeze({
  loginUseCase,
  signUpUseCase,
});

export const taskService = Object.freeze({
  getTaskUseCase,
  deleteTaskUseCase,
  createTaskUseCase,
  updateTaskUseCase,
});
