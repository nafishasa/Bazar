
"use client";

import { useMemo, useState } from "react";
import ProductCard from "../body/ProductCard";
import type { Product as ProductWithMarkets } from "../../type/interface";

type Product = {
  id: number;
  category: string;
  categoryIcon: string;
  categoryNameBn: string;
  change: { dir: "up" | "down"; pct: number };
  image: string;
  lastMonth: number;
  lastWeek: number;
  markets: ProductWithMarkets["markets"];
  nameBn: string;
  slug: string;
  today: number;
  unit: string;
  yesterday: number;
};

type SortBy = "default" | "low" | "high";

const bn = (n: number) => n.toLocaleString("bn-BD");

const SortableProducts = ({ products }: { products: Product[] }) => {
  const [sortBy, setSortBy] = useState<SortBy>("default");

  const sorted = useMemo(() => {
    const list = [...products];

    if (sortBy === "low") list.sort((a, b) => a.today - b.today);
    if (sortBy === "high") list.sort((a, b) => b.today - a.today);

    return list;
  }, [products, sortBy]);

  return (
    <div className="w-full min-w-0 space-y-4">
      {/* Sort bar */}
      <section className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-end sm:gap-2 sm:rounded-3xl sm:px-5 sm:py-4">
        <label htmlFor="sort" className="text-sm text-gray-600">
          দাম অনুযায়ী সাজান
        </label>

        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortBy)}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-emerald-600 sm:w-auto"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low">কম দাম</option>
          <option value="high">বেশি দাম</option>
        </select>
      </section>

      <p className="text-sm text-gray-600">
        মোট {bn(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Product grid */}
      {sorted.length === 0 ? (
        <p className="rounded-2xl border border-gray-200 bg-white p-5 text-center text-sm text-gray-600 sm:p-6">
          কোনো পণ্য পাওয়া যায়নি।
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {sorted.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SortableProducts;