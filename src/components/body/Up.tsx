
import { Product } from '@/type/interface';
import React from 'react';
import ProductCard from './ProductCard';
import Link from 'next/link';

const Up = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      cache: "force-cache",
    }
  );

  const data: Product[] = await res.json();
  const upData = data.filter(d => d.change.dir == "up");
  const sortData = upData.sort((a, b) => b.change.pct - a.change.pct);

  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <p className="flex items-center gap-2 text-2xl font-bold sm:text-3xl">
        <span className="text-red-700">▲</span>
        আজ দাম বেড়েছে
      </p>

      <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortData.slice(0, 6).map(n => (
          <Link
            href={`/products/${n.id}`}
            key={n.id}
            className="block min-w-0"
          >
            <ProductCard product={n} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Up;