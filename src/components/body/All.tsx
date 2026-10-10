
import { Product } from '@/type/interface';
import Link from 'next/link';
import React from 'react';
import ProductCard from './ProductCard';

const All = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      cache: "force-cache",
    }
  );

  const data: Product[] = await res.json();

  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <p className="flex gap-2 text-2xl font-bold sm:text-3xl">
        সব পণ্য
      </p>

      <p className="mt-1 text-sm text-gray-500 sm:text-base">
        মোট ৩৩টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((n) => (
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

export default All;