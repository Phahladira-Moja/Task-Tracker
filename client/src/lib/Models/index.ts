import { Priority } from "@/constants/Enums";

export type ITask = {
  id: string;
  title: string;
  description: string;
  priority: Priority;
};
