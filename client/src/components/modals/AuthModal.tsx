import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useUserContext } from "../../providers/AuthContext";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface AuthModalProps {
  isLogin: boolean;
}

const formSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(30, {
      message: "Username must be at most 30 characters.",
    }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

export default function AuthModal({ isLogin }: AuthModalProps) {
  const { setToken } = useUserContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = isLogin
        ? await axios.post("http://localhost:8000/api/v1/users/login", values)
        : await axios.post("http://localhost:8000/api/v1/users/signup", values);
      // isLogin ? await axios.post("/api/servers", values) : await axios.post("/api/servers", values);

      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);

      if (response.status === 200 && isLogin)
        toast.success(response.data.message);
      else if (response.status === 200 && !isLogin)
        toast.success(response.data.message);
      else toast.error(response.data.message);

      form.reset();
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Unexpected error occurred. Try again later.");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className={cn("btn", "w-full ")}>
          {isLogin ? "Login" : "Sign Up"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isLogin ? "Login" : "Sign Up"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                      disabled={isLoading}
                    />
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
                {isLogin ? "Login" : "Sign Up"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
