
import React from "react";
import TodayDate from "../time/TodayTime";
import Responsivebanner from "./Responsivebanner";

const Banner = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      cache: "force-cache",
    }
  );

  const data = await res.json();

  return (
    <div className="container mx-auto w-full px-3 sm:px-4 lg:px-6">
      <section className="relative overflow-hidden rounded-2xl border-2 border-teal-400 bg-emerald-50/40 px-4 py-6 sm:rounded-3xl sm:px-6 sm:py-8 lg:px-8">
        <span className="absolute -left-2 -top-2 h-4 w-4 rounded-full border-2 border-teal-400 bg-white" />
        <span className="absolute -right-2 -top-2 h-4 w-4 rounded-full border-2 border-teal-400 bg-white" />
        <span className="absolute -bottom-2 -left-2 h-4 w-4 rounded-full border-2 border-teal-400 bg-white" />
        <span className="absolute -bottom-2 -right-2 h-4 w-4 rounded-full border-2 border-teal-400 bg-white" />

        <div className="flex flex-col-reverse items-center justify-between gap-6 md:flex-row md:gap-8">
          <div className="w-full min-w-0 md:max-w-xl">
            <span className="inline-flex max-w-full items-center rounded-full bg-emerald-100 px-3 py-2 text-xs font-semibold text-emerald-700 sm:text-sm">
              <TodayDate />
            </span>

            <h1 className="mt-4 break-words text-2xl font-extrabold leading-snug text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-3 text-sm leading-7 text-gray-600 sm:mt-4 sm:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <button
              type="button"
              className="mt-5 w-full rounded-lg border border-emerald-600 px-6 py-3 text-sm font-medium text-emerald-700 transition hover:bg-emerald-600 hover:text-white sm:w-auto"
            >
              বিস্তারিত দেখুন
            </button>
          </div>

          <div className="w-full min-w-0 md:w-1/2">
            <Responsivebanner data={data} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;