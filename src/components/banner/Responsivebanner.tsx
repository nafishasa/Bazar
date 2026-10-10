
"use client";

import { authClient } from "@/app/lib/auth-client";
import { Product } from "@/type/interface";
import Image from "next/image";

const Responsivebanner = ({ data }: { data: Product[] }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const bazar = data[1];

  return (
    <div className="w-full min-w-0">
      {user ? (
        <div className="grid w-full grid-cols-1 divide-y divide-dashed divide-gray-300 overflow-hidden rounded-2xl border border-emerald-100 bg-[#f0f5f0] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="px-4 py-4 sm:px-3 md:px-4">
            <p className="text-sm text-gray-700">পণ্য</p>
            <p className="mt-1 text-2xl font-extrabold text-emerald-700 sm:text-3xl">
              {data.length}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-gray-600">
              টি নিত্যপ্রয়োজনীয় পণ্য
            </p>
          </div>

          <div className="px-4 py-4 sm:px-3 md:px-4">
            <p className="text-sm text-gray-700">বাজার</p>
            <p className="mt-1 text-2xl font-extrabold text-gray-800 sm:text-3xl">
              {bazar?.markets?.length ?? 0}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-gray-600">
              টি বাজারের তথ্য
            </p>
          </div>

          <div className="px-4 py-4 sm:px-3 md:px-4">
            <p className="text-sm text-gray-700">বিভাগ</p>
            <p className="mt-1 text-2xl font-extrabold text-gray-800 sm:text-3xl">
              {(bazar?.markets?.length ?? 0) / 2}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-gray-600">
              টি বিভাগের তথ্য
            </p>
          </div>
        </div>
      ) : (
        <div className="flex w-full justify-center">
          <Image
            src="/b.png"
            alt="Market basket"
            width={260}
            height={200}
            priority
            className="h-auto w-full max-w-[260px] object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Responsivebanner;