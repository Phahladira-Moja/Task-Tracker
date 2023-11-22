import { authService, taskService } from "../usecases";
import { makeLogin, makeSignup } from "./auth_controller";
import {
  makeCreateTask,
  makeDeleteTask,
  makeGetTask,
  makeUpdateTask,
} from "./task_controller";

const { loginUseCase, signUpUseCase } = authService;
const {
  getTaskUseCase,
  deleteTaskUseCase,
  createTaskUseCase,
  updateTaskUseCase,
} = taskService;

const login = makeLogin({ loginUseCase });
const signup = makeSignup({ signUpUseCase });

const getTask = makeGetTask({ getTaskUseCase });
const createTask = makeCreateTask({ createTaskUseCase });
const updateTask = makeUpdateTask({ updateTaskUseCase });
const deleteTask = makeDeleteTask({ deleteTaskUseCase });

export const authController = Object.freeze({
  login,
  signup,
});

export const taskController = Object.freeze({
  getTask,
  createTask,
  updateTask,
  deleteTask,
});
