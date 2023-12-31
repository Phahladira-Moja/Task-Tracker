import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Priority } from "@/constants/Enums";
import { useUserContext } from "../../providers/AuthContext";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import toast from "react-hot-toast";

interface TaskModalProps {
  isCreating: boolean;
  id?: string;
  title?: string;
  description?: string;
  priority?: Priority;
}

const formSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(30, {
      message: "Username must be at most 30 characters.",
    }),
  description: z
    .string()
    .min(4, {
      message: "Description must be at least 4 characters.",
    })
    .max(50, {
      message: "Description must be at most 50 characters.",
    }),
  priority: z.enum([Priority.Low, Priority.Medium, Priority.High]),
});

const TaskModal = ({
  isCreating,
  id,
  title,
  description,
  priority,
}: TaskModalProps) => {
  const { token } = useUserContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title ? title : "",
      description: description ? description : "",
      priority: priority ? priority : Priority.Low,
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const config = {
        method: isCreating ? "POST" : "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ? token : "No Token"}`,
        },
        body: JSON.stringify({
          ...values,
        }),
      };

      const response = await fetch(
        isCreating
          ? "http://localhost:8000/api/v1/tasks"
          : `http://localhost:8000/api/v1/tasks/${id}`,
        config
      );

      const data = await response.json();

      form.reset();
      window.location.reload();
      if (response.status === 200) toast.success(data.message);
      else toast.error(data.message);
    } catch (error) {
      console.log(error);
    }
  }

  function priorityMapper(priority: string): string {
    if (priority === "LOW") return "Low";

    if (priority === "MEDIUM") return "Medium";

    return "High";
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className={cn("btn", "w-full ")}>
          {isCreating ? "Create Task" : "Edit"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isCreating ? "Create Task" : "Edit Task"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Finish login button"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your task description here."
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Priority</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={priorityMapper(field.value)}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={Priority.Low}>Low</SelectItem>
                        <SelectItem value={Priority.Medium}>Medium</SelectItem>
                        <SelectItem value={Priority.High}>High</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                disabled={isLoading}
                type="submit"
                className={cn("btn", "w-full")}
              >
                {isCreating ? "Create Task" : "Update Task"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
