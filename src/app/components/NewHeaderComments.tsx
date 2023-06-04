import { useState, useEffect, useRef } from "react";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import UserAvatar from "./UserAvatar";
import UserMenu from "./UserMenu";

export default function NewHeader({ user }: { user: User | null }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLButtonElement>(null);
  // TODO: the menu doesnt close when you click on the avatar and the menu is opened
  const handleAvatarClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //   const handleAvatarClick = () => {
  //     if (isMenuOpen) {
  //       setIsMenuOpen(false);
  //     } else {
  //       setIsMenuOpen(true);
  //     }
  //   };

  //   const handleAvatarClick = () => {
  //     setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  //   };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div>
      <header className="bg-slate-50 py-2">
        <nav className="container mx-auto text-sm">
          <div className="w-full flex gap-2 md:mb-0 justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-1 w-fit-content"
              onClick={() => router.push("/")}
            >
              The score
            </button>
            {!user ? (
              <div className="flex gap-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-1 w-fit-content"
                  onClick={() => router.push("/sign-in")}
                >
                  Sign In
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-1 w-fit-content"
                  onClick={() => router.push("/sign-up")}
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <>
                <button ref={avatarRef} onClick={handleAvatarClick}>
                  <UserAvatar user={user} />
                </button>
                {isMenuOpen && <UserMenu user={user} menuRef={menuRef} />}
              </>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}
