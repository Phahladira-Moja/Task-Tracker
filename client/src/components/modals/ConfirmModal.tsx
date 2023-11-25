import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useUserContext } from "../../providers/AuthContext";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ConfirmModalProps {
  id?: string;
  isLoggingOut: boolean;
}

const ConfirmModal = ({ isLoggingOut, id }: ConfirmModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { token, setToken, setIsAuthenticated } = useUserContext();

  async function onSubmit() {
    try {
      setIsLoading(true);

      if (isLoggingOut) {
        setToken("");
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      } else {
        const config = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token ? token : "No Token"}`,
          },
        };

        const response = await fetch(
          `http://localhost:8000/api/v1/tasks/${id}`,
          config
        );

        const data = await response.json();

        if (response.status === 200) toast.success(data.message);
        else toast.error("Delete task failed");
      }

      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={isLoggingOut ? "ghost" : "destructive"}
          size="sm"
          className={cn("btn", "w-full ")}
        >
          {isLoggingOut ? "Sign Out" : "Delete"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{!isLoggingOut && "Delete Task"}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="w-full flex-center flex-col gap-y-2">
            <h1 className="text-xl font-semibold text-black">Are you sure?</h1>

            <p className="desc text-center">
              {isLoggingOut
                ? "You are about to sign out. Are you sure about this action?"
                : "You are about to delete this task. Are you sure about this action?"}
            </p>
          </div>
        </DialogDescription>
        <DialogFooter>
          <Button
            disabled={isLoading}
            variant="destructive"
            type="submit"
            className={cn("btn", "w-full")}
            onClick={onSubmit}
          >
            {isLoggingOut ? "Sign Out" : "Delete Task"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
