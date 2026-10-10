
"use client";

import React from "react";
import { authClient } from "../lib/auth-client";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const SignIn = () => {
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      confirm: string;
      password: string;
    };

    if (user.password !== user.confirm) {
      alert("Password and Confirm Password do not match!");
      return;
    }

    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    if (data) {
      redirect("/");
    } else {
      console.log(error);
    }
  }

  const signIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const signInGittu = async () => {
    await authClient.signIn.social({
      provider: "github",
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center px-4 py-8 sm:py-10">
      <div className="w-full max-w-md">
        <div className="text-center">
          <p className="text-2xl font-bold sm:text-3xl">
            অ্যাকাউন্ট তৈরি করুন
          </p>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <form className="mt-5 w-full" onSubmit={onSubmit}>
          <fieldset className="fieldset w-full rounded-box p-0">
            <label className="label">Name</label>
            <input
              name="name"
              type="text"
              className="input w-full"
              placeholder="Your name"
              required
            />

            <label className="label mt-2">Email</label>
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

            <label className="label mt-2">Confirm Password</label>
            <input
              name="confirm"
              type="password"
              className="input w-full"
              placeholder="Confirm your password"
              required
            />

            <button
              type="submit"
              className="btn btn-neutral mt-4 w-full"
            >
              Sign up
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
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/sign-in"
            className="text-blue-600 hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
