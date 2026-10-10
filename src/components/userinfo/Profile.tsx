
"use client";

import { authClient } from "@/app/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

const Profile = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const signout = async () => {
    await authClient.signOut();
  };

  return (
    <div className="flex min-w-0 items-center">
      {user?.name ? (
        <div className="flex min-w-0 items-center gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-sm max-w-[170px] sm:btn-md sm:max-w-[220px]"
            >
              <span className="truncate">{user.name}</span>
              <span>⬇️</span>
            </div>

            <ul
              tabIndex={-1}
              className="dropdown-content menu z-50 mt-2 w-48 max-w-[calc(100vw-2rem)] rounded-box border border-gray-200 bg-base-100 p-2 shadow-lg sm:w-52"
            >
              <li>
                <button onClick={signout}>Sign Out</button>
              </li>
              <li>
                <Link href="/update">Update Your Profile</Link>
              </li>
            </ul>
          </div>

          <div className="avatar avatar-online shrink-0">
            <div className="w-9 rounded-full sm:w-11">
              <Image
                alt="User avatar"
                width={44}
                height={44}
                src="https://img.daisyui.com/images/profile/demo/gordon@192.webp"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/sign-in"
            className="btn btn-sm btn-outline sm:btn-md"
          >
            Sign In
          </Link>

          <Link
            href="/s"
            className="btn btn-sm border-none bg-green-800 text-white hover:bg-green-900 sm:btn-md"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Profile;