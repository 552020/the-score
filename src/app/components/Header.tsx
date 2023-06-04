import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { signUserOut } from "@/utils/auth";

export default function Header({ user }: { user: User | null }) {
  const router = useRouter();
  return (
    <div>
      <header className="bg-slate-50 py-2">
        <nav className=" container mx-auto  text-sm">
          <div className=" w-full flex gap-2  md:mb-0 justify-between ">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-1 w-fit-content"
              onClick={() => router.push("/")}
            >
              The score
            </button>
            {!user && (
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
            )}
            {user && (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-1 w-fit-content"
                onClick={() => router.push("/settings")}
              >
                Settings
              </button>
            )}
          </div>

          {user && (
            <div className="w-full md:w-auto md:ml-auto flex flex-col gap-2 md:flex-row items-start md:items-center">
              <div className="flex items-center">
                <span className="bg-blue-500 text-white rounded-l-lg px-3 py-1 ">Signed in as:</span>
                <span className="bg-white text-black rounded-r-lg px-3 py-1">{user.email}</span>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-1 w-fit-content"
                onClick={signUserOut}
              >
                Sign Out
              </button>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
}
