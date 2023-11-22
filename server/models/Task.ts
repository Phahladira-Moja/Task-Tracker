export type Task = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  userId: string;
};
