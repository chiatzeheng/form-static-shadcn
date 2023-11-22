import React from "react";

import UserAccountNav from "./useracc";
import type { User } from "next-auth";

const Navbar = ({ user }: { user: User }) => {
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[10] h-30 border-b border-zinc-300 bg-white py-2 dark:bg-gray-950 ">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-2">
          <div className="flex items-center gap-2" >
            <h1 className="text-white">BE FORM </h1>
        </div>
          <div className="flex items-center">
            <UserAccountNav user={user} />
          </div>
        </div>
      </div>
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;