
import { Product } from "@/type/interface";
import Link from "next/link";
import React, { Suspense } from "react";
import Marquee from "react-fast-marquee";

const Query = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      cache: "force-cache",
    },
  );

  const data: Product[] = await res.json();

  return (
    <div className="w-full overflow-hidden py-4 sm:py-5">
      <Marquee
        direction="right"
        speed={40}
        pauseOnHover={true}
        gradient={false}
      >
        <Suspense fallback={<div className="px-4 py-2">লোড হচ্ছে...</div>}>
          {data.map((n) => (
            <Link
              href={`/products/${n.id}`}
              key={n.id}
              className="mx-1 inline-block whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs transition-colors hover:bg-emerald-50 hover:underline sm:mx-2 sm:px-5 sm:text-sm md:px-7"
            >
              {n.categoryIcon} {n.nameBn}{" "}
              <span className="font-semibold">
                {n.today} টাকা/কেজি
              </span>{" "}
              <span
                className={
                  n.change.dir === "up"
                    ? "font-semibold text-red-700"
                    : "font-semibold text-green-700"
                }
              >
                {n.change.dir === "up" ? "▲" : "▼"} {n.change.pct}%
              </span>
            </Link>
          ))}
        </Suspense>
      </Marquee>
    </div>
  );
};

export default Query;