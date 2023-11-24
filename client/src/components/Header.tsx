import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AuthModal from "./modals/AuthModal";
import TaskModal from "./modals/TaskModal";
import ConfirmModal from "./modals/ConfirmModal";

const Header = () => {
  const isLoggedIn = false;

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <div className="flex gap-2 flex-center">
        <img
          className="object-contain rounded-full w-[37px] h-[37px] bg-transparent"
          src="./src/assets/logo.svg"
          alt="logo"
        />
        <p className="logo_text">Task&Tasks</p>
      </div>

      <div className="sm:flex hidden">
        <div className="flex-center gap-3 md:gap-4 rounded">
          {isLoggedIn && <TaskModal isCreating />}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="hover:cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-16">
              {isLoggedIn ? (
                <ConfirmModal isLoggingOut />
              ) : (
                <>
                  <AuthModal isLogin />
                  <DropdownMenuSeparator />
                  <AuthModal isLogin={false} />
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="hover:cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-8 w-5">
            {isLoggedIn ? (
              <>
                <Button
                  variant="default"
                  size="sm"
                  className={cn("btn", "w-full mb-2")}
                >
                  Create Task
                </Button>
                <ConfirmModal isLoggingOut />
              </>
            ) : (
              <>
                <AuthModal isLogin />
                <DropdownMenuSeparator />
                <AuthModal isLogin={false} />
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Header;
