import { useState } from "react";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import UserAvatar from "./UserAvatar";
import UserMenu from "./UserMenu";

export default function NewHeader({ user }: { user: User | null }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAvatarClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
                <button onClick={handleAvatarClick}>
                  <UserAvatar user={user} />
                </button>
                {isMenuOpen && <UserMenu user={user} />}
              </>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}
