
import React, { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  change: { dir: "up" | "down"; pct: number };
  markets: Market[];
};

const unitMap: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  piece: "পিস",
  dozen: "ডজন",
  hali: "হালি",
};

const bn = (n: number) =>
  n.toLocaleString("bn-BD", { maximumFractionDigits: 2 });

const ProductContent = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  await connection();

  const { id } = await params;

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products/${id}`,
    { cache: "force-cache" }
  );

  if (!res.ok) {
    return (
      <div className="container mx-auto w-full px-3 py-6 sm:px-4 sm:py-10">
        <p className="rounded-2xl border border-gray-200 bg-white p-5 text-center text-sm text-gray-600 sm:p-6 sm:text-base">
          পণ্যের তথ্য পাওয়া যায়নি।
        </p>
      </div>
    );
  }

  const data: Product = await res.json();

  const unit = unitMap[data.unit] ?? data.unit;
  const isUp = data.change.dir === "up";
  const diff = Math.abs(data.today - data.yesterday);

  const markets = [...data.markets].sort(
    (a, b) => a.min + a.max - (b.min + b.max)
  );

  const lowest =
    data.markets.length > 0
      ? Math.min(...data.markets.map((m) => m.min))
      : 0;

  const highest =
    data.markets.length > 0
      ? Math.max(...data.markets.map((m) => m.max))
      : 0;

  return (
    <main className="container mx-auto w-full max-w-7xl space-y-4 px-3 py-4 sm:space-y-5 sm:px-5 sm:py-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 text-xs leading-relaxed text-gray-600 sm:text-sm">
        <Link href="/" className="hover:text-emerald-700">
          হোম
        </Link>
        <span>&gt;</span>
        <span className="break-words">{data.categoryNameBn}</span>
        <span>&gt;</span>
        <span className="break-words font-medium text-gray-900">
          {data.nameBn}
        </span>
      </nav>

      {/* Header Card */}
      <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:rounded-3xl sm:p-5 md:flex-row md:items-center md:justify-between md:gap-6 md:p-6">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl sm:h-16 sm:w-16 sm:rounded-2xl sm:text-3xl">
            {data.image || data.categoryIcon || "🛒"}
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="break-words text-xl font-extrabold text-gray-900 sm:text-2xl md:text-3xl">
              {data.nameBn}
            </h1>

            <p className="mt-1 break-words text-xs text-gray-600 sm:text-sm">
              প্রতি {unit} · {data.categoryNameBn}
            </p>

            <p className="mt-2 text-xs leading-relaxed text-gray-800 sm:text-sm">
              গতকালের তুলনায় আজ দাম{" "}
              <span className="font-bold">
                {isUp ? "বেড়েছে" : "কমেছে"}
              </span>{" "}
              · {bn(diff)} টাকা
            </p>
          </div>
        </div>

        <div className="w-full rounded-2xl bg-gray-100 px-4 py-4 text-center sm:px-6 md:w-auto md:min-w-40">
          <p className="text-xs text-gray-600">আজকের দাম</p>

          <p className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">
            {bn(data.today)}
          </p>

          <p className="text-xs text-gray-600">টাকা / {unit}</p>

          <p
            className={`mt-1 text-xs font-semibold ${
              isUp ? "text-red-600" : "text-green-600"
            }`}
          >
            {isUp ? "▲" : "▼"} {bn(data.change.pct)}%
          </p>
        </div>
      </section>

      {/* Price Summary and Market Table */}
      <section className="rounded-2xl border border-gray-200 bg-white p-3 sm:rounded-3xl sm:p-5 md:p-6">
        <h2 className="text-base font-bold text-gray-900 sm:text-lg">
          দামের সারসংক্ষেপ
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {/* Lowest Price */}
          <div className="rounded-2xl border border-gray-200 p-4">
            <p className="text-xs text-gray-600 sm:text-sm">
              সর্বনিম্ন দাম
            </p>

            <p className="mt-1 break-words text-xl font-extrabold text-green-600">
              {bn(lowest)}{" "}
              <span className="text-sm font-medium">টাকা</span>
            </p>

            <p className="mt-1 text-xs leading-relaxed text-gray-600">
              সবচেয়ে কম দামের বাজার
            </p>
          </div>

          {/* Highest Price */}
          <div className="rounded-2xl border border-gray-200 p-4">
            <p className="text-xs text-gray-600 sm:text-sm">
              সর্বাধিক দাম
            </p>

            <p className="mt-1 break-words text-xl font-extrabold text-red-600">
              {bn(highest)}{" "}
              <span className="text-sm font-medium">টাকা</span>
            </p>

            <p className="mt-1 text-xs leading-relaxed text-gray-600">
              সবচেয়ে বেশি দামের বাজার
            </p>
          </div>

          {/* Today's Price */}
          <div className="rounded-2xl border border-gray-200 p-4 sm:col-span-2 lg:col-span-1">
            <p className="text-xs text-gray-600 sm:text-sm">
              আজকের দাম
            </p>

            <p className="mt-1 break-words text-xl font-extrabold text-emerald-700">
              {bn(data.today)}{" "}
              <span className="text-sm font-medium">টাকা</span>
            </p>

            <p className="mt-1 text-xs leading-relaxed text-gray-600">
              প্রতি {unit}-এর হিসাবে
            </p>
          </div>
        </div>

        {/* Market Table */}
        <h2 className="mt-6 text-base font-bold text-gray-900 sm:mt-8 sm:text-lg">
          বাজারভিত্তিক আজকের দাম
        </h2>

        {markets.length === 0 ? (
          <p className="mt-4 rounded-2xl bg-gray-50 p-4 text-center text-sm leading-relaxed text-gray-600 sm:p-5 sm:text-base">
            বাজারের দামের তথ্য পাওয়া যায়নি।
          </p>
        ) : (
          <div className="mt-4 w-full overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full  text-xs sm:min-w-[640px] sm:text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-gray-600">
                  <th className="whitespace-nowrap px-3 py-3 text-left font-medium sm:px-4">
                    বাজার
                  </th>
                  <th className="whitespace-nowrap px-3 py-3 text-left font-medium sm:px-4">
                    বিভাগ
                  </th>
                  <th className="whitespace-nowrap px-3 py-3 text-right font-medium sm:px-4">
                    সর্বনিম্ন
                  </th>
                  <th className="whitespace-nowrap px-3 py-3 text-right font-medium sm:px-4">
                    সর্বাধিক
                  </th>
                  <th className="whitespace-nowrap px-3 py-3 text-right font-medium sm:px-4">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody>
                {markets.map((m) => (
                  <tr
                    key={m.market}
                    className="border-b border-gray-100 last:border-0 odd:bg-white even:bg-emerald-50/40"
                  >
                    <td className="whitespace-nowrap px-3 py-3 font-semibold text-gray-900 sm:px-4">
                      {m.market}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-gray-700 sm:px-4">
                      {m.division}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-right text-gray-700 sm:px-4">
                      {bn(m.min)} টাকা
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-right text-gray-700 sm:px-4">
                      {bn(m.max)} টাকা
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-right font-bold text-gray-900 sm:px-4">
                      {bn((m.min + m.max) / 2)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
};

const Page = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-6 text-sm sm:text-base">
          পণ্যের তথ্য লোড হচ্ছে...
        </div>
      }
    >
      <ProductContent params={params} />
    </Suspense>
  );
};

export default Page;

