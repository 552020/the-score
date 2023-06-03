import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { signUserOut } from "@/utils/auth";

export default function Header({ user }: { user: User | null }) {
  const router = useRouter();
  return (
    <div>
      <header className="bg-gray-200 py-2">
        <nav className="container mx-auto flex flex-wrap items-start justify-between text-sm">
          <div className="w-fit-content md:w-auto flex flex-col gap-2 mb-2 md:mb-0">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-1 w-fit-content"
              onClick={() => router.push("/")}
            >
              Home
            </button>
            {!user && (
              <>
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
              </>
            )}
            {user && (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-1 w-fit-content"
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
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
