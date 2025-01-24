import Link from "next/link";
import { auth, signOut, signIn } from "@/auth";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center text-black">
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="45 0 500 10"
            width="144"
            height="30"
          >
            <text
              x="40"
              y="30"
              fill="#333"
              fontFamily="font-work-sans"
              fontSize="75"
              fontWeight="bold"
              alignmentBaseline="middle"
            >
              <tspan fill="black">Event</tspan>
              <tspan fill="purple">opia</tspan>
            </text>
          </svg>
        </Link>
        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <Link href="/event/create">
                {" "}
                <span>Create Event</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">Logout</button>
              </form>
              {/* <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
              </Link> */}
              <Link href="/">
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
