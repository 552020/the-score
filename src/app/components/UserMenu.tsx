import UserAvatar from "./UserAvatar";
import { User } from "firebase/auth";
import { ArrowLeftOnRectangleIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { signUserOut } from "@/utils/auth";

type UserMenuProps = {
  user: User;
  menuRef: React.RefObject<HTMLDivElement>;
};

function UserMenu({ user, menuRef }: UserMenuProps) {
  const displayName = user.displayName || "Anonymous";
  const email = user.email || "No email";

  return (
    <>
      <div
        ref={menuRef}
        className="origin-top-right absolute right-5 top-12 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
      >
        <div className="rounded-md bg-white shadow-xs">
          <div className="py-1 border">
            <div className="flex h-fit-content items-center gap-x-22 px-1">
              <UserAvatar user={user} />
              <div className="flex grow flex-col items-stretch overflow-hidden">
                <div className="truncate text-body-small-bold">{displayName}</div>
                <div className="truncate text-body-tiny text-fg-secondary">{email}</div>
              </div>
            </div>
            <hr className="h-[1px] bg-divider-primary" />
            <a href="/settings" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">
              <Cog6ToothIcon className="h-5 w-5 inline-block mr-2" />
              Account settings
            </a>
            <button className="text-red-700 block px-4 py-2 text-sm" onClick={signUserOut}>
              <ArrowLeftOnRectangleIcon className="h-5 w-5 inline-block mr-2" />
              Log out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserMenu;
