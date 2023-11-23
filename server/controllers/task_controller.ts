import express from "express";

export function makeCreateTask({ createTaskUseCase }: any) {
  return async function createTask(
    req: express.Request,
    res: express.Response
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    const { userId, title, description, priority } = req.body;

    const result = await createTaskUseCase(
      userId,
      title,
      description,
      priority
    );

    return res
      .status(result.code)
      .header(headers)
      .json({
        ...result,
      });
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

    const taskId = req.params.id;
    const { title, description, priority } = req.body;

    const result = await updateTaskUseCase(
      taskId,
      title,
      description,
      priority
    );

    return res
      .status(result.code)
      .header(headers)
      .json({
        ...result,
      });
  };
}

export function makeGetTask({ getTaskUseCase }: any) {
  return async function getTask(req: express.Request, res: express.Response) {
    const headers = {
      "Content-Type": "application/json",
    };

    const userId = req.params.id;
    const result = await getTaskUseCase(userId);

    return res
      .status(result.code)
      .header(headers)
      .json({
        ...result,
      });
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

    const taskId = req.params.id;
    const result = await deleteTaskUseCase(taskId);

    return res
      .status(result.code)
      .header(headers)
      .json({
        ...result,
      });
  };
}
