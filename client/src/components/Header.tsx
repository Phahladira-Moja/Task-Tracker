import { useState } from "react";

import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const isLoggedIn = true;

  const [toggleDropdown, setToggleDropdown] = useState(false);
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
        {isLoggedIn ? (
          <div className="flex gap-3 md:gap-4 rounded">
            <Button variant="default" size="sm">
              Create Task
            </Button>
            <Button variant="outline" size="sm">
              Logout
            </Button>
          </div>
        ) : (
          <Button variant="default" size="sm">
            Login
          </Button>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {isLoggedIn ? (
          <div className="flex">
            <Avatar onClick={() => setToggleDropdown((prev) => !prev)}>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            {toggleDropdown && (
              <div className="dropdown">
                <Button variant="default" size="sm">
                  Create Task
                </Button>
                <Button variant="outline" size="sm">
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        ) : (
          <Button variant="default" size="sm">
            Sign In
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Header;
