import React from "react";
import UserAvatar from "./UserAvatar";
import { User } from "firebase/auth";

function UserMenu({ user }: { user: User }) {
  //   const { displayName, email, photoURL } = user;

  //   if (!displayName) {
  //     displayName = "Anonymous";
  //   }

  const displayName = "Anonymous";
  const email = user.email;

  return (
    <>
      <div className="origin-top-right absolute right-5 top-12 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div className="rounded-md bg-white shadow-xs">
          <div className="py-1 border border-pink-100" role="menu" aria-orientation="vertical">
            <div className="border-2 border-red-500 flex h-fit-content items-center gap-x-22 px-1">
              <UserAvatar user={user} />
              <div className="flex grow flex-col items-stretch overflow-hidden">
                <div className="truncate text-body-small-bold">{displayName}</div>
                <div className="truncate text-body-tiny text-fg-secondary">{email}</div>
              </div>
            </div>
            <hr className="h-[1px] bg-divider-primary" />
            <a href="/settings" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">
              Account settings
            </a>
            <a href="/logout" className="text-red-700 block px-4 py-2 text-sm" role="menuitem">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              Log out
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserMenu;
