import { cn } from "@/lib/utils";

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

interface ConfirmModalProps {
  id?: string;
  isLoggingOut: boolean;
}

const ConfirmModal = ({ isLoggingOut, id }: ConfirmModalProps) => {
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
            //   disabled={isLoading}
            variant="destructive"
            type="submit"
            className={cn("btn", "w-full")}
          >
            {isLoggingOut ? "Sign Out" : "Delete Task"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
