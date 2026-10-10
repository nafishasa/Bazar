
import { Product } from '@/type/interface';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="h-full rounded-2xl border border-gray-200 bg-emerald-50/30 p-3 transition-shadow hover:shadow-md sm:p-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xl sm:h-12 sm:w-12 sm:text-2xl">
          {product.image}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="break-words text-sm font-bold text-gray-900 sm:text-base">
            {product.nameBn}
          </h3>
          <p className="mt-1 text-xs text-gray-600">প্রতি কেজি</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-600">আজকের দাম</p>

      <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
        <p className="text-base font-bold text-gray-900 sm:text-lg">
          {product.today.toLocaleString('bn-BD')}{' '}
          <span className="text-sm font-normal">টাকা</span>
        </p>

        <span
          className={`inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold ${
            product.change.dir === 'up'
              ? 'bg-red-100 text-red-600'
              : 'bg-green-100 text-green-600'
          }`}
        >
          {product.change.dir === 'up' ? '▲' : '▼'}{' '}
          {product.change.pct.toLocaleString('bn-BD')}%
        </span>
      </div>
    </div>
  );
};

export default ProductCard;