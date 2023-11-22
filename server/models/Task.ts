import { Task } from "@prisma/client";

export type CreateTask = {
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
};

export type SafeTask = Omit<Task, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};
