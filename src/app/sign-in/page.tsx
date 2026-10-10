
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { authClient } from "../lib/auth-client";

const Page = () => {
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: "/",
    });

    if (error) {
      alert(error.message);
    }
  }

  const signIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  const signInGittu = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center px-4 py-8 sm:py-10">
      <div className="w-full max-w-md">
        <div className="text-center">
          <p className="text-2xl font-bold sm:text-3xl">সাইন ইন</p>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            বিনা খরচে সাইন ইন করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <form className="mt-5 w-full" onSubmit={onSubmit}>
          <fieldset className="fieldset w-full rounded-box p-0">
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input w-full"
              placeholder="Email"
              required
            />

            <label className="label mt-2">Password</label>
            <input
              name="password"
              type="password"
              className="input w-full"
              placeholder="Password"
              required
            />

            <button
              type="submit"
              className="btn btn-neutral mt-4 w-full"
            >
              Sign In
            </button>
          </fieldset>
        </form>

        <div className="mt-4 w-full">
          <div className="divider">OR</div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={signIn}
              type="button"
              className="btn w-full flex-1"
            >
              <Image
                alt="Google"
                src="/g.jpeg"
                width={20}
                height={20}
              />
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              onClick={signInGittu}
              type="button"
              className="btn w-full flex-1"
            >
              <Image
                alt="GitHub"
                src="/gi.jpeg"
                width={20}
                height={20}
              />
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>
        </div>

        <div className="py-4 text-center text-sm sm:text-base">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/sign-up"
            className="text-blue-600 hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;