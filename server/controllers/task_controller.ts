import express from "express";

export function makeCreateTask({ createTaskUseCase }: any) {
  return async function createTask(
    req: express.Request,
    res: express.Response
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    const result = await createTaskUseCase();

    return result;
  };
}

export function makeUpdateTask({ updateTaskUseCase }: any) {
  return async function updateTask(
    req: express.Request,
    res: express.Response
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    const result = await updateTaskUseCase();

    return result;
  };
}

export function makeGetTask({ getTaskUseCase }: any) {
  return async function getTask(req: express.Request, res: express.Response) {
    const headers = {
      "Content-Type": "application/json",
    };

    const result = await getTaskUseCase();

    return result;
  };
}

export function makeDeleteTask({ deleteTaskUseCase }: any) {
  return async function deleteTask(
    req: express.Request,
    res: express.Response
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    const result = await deleteTaskUseCase();

    return result;
  };
}
