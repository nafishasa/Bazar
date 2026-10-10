
"use client";

import Image from "next/image";
import React, { useState } from "react";
import { authClient } from "../lib/auth-client";

const Updatepage = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const user = Object.fromEntries(formData.entries()) as {
        name: string;
      };

      const { error } = await authClient.updateUser({
        ...user,
      });

      if (error) {
        alert(error.message);
      } else {
        alert("Profile updated successfully!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full justify-center px-4 py-8 sm:py-10">
      <div className="flex w-full max-w-md flex-col items-center">
        <div className="avatar avatar-online">
          <div className="w-20 rounded-full sm:w-24">
            <Image
              alt="Profile avatar"
              height={250}
              width={250}
              src="https://img.daisyui.com/images/profile/demo/gordon@192.webp"
            />
          </div>
        </div>

        <p className="mt-4 text-2xl font-bold sm:text-3xl">
          My account
        </p>

        <p className="mt-1 text-center text-sm text-gray-500 sm:text-base">
          This is your profile data
        </p>

        <form className="mt-5 w-full" onSubmit={onSubmit}>
          <fieldset className="fieldset w-full rounded-box p-0">
            <label className="label">Name</label>

            <input
              name="name"
              type="text"
              className="input w-full"
              placeholder="Change your name"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="btn btn-neutral mt-4 w-full"
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Updatepage;
