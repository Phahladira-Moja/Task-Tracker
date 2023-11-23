import { ResponseModel } from "../models/ResponseModel";
import { CreateTask, SafeTask } from "../models/Task";

export default interface ITaskRepository {
  getTasks(id: string): Promise<ResponseModel>;
  createTask(userId: string, task: CreateTask): Promise<ResponseModel>;
  updateTask(id: string, task: CreateTask): Promise<ResponseModel>;
  deleteTask(id: string): Promise<ResponseModel>;
}
