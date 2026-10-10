
import { Suspense, type ComponentProps } from "react";
import SortableProducts from "@/components/sortby/sortby";

const bn = (n: number) => n.toLocaleString("bn-BD");

const CategoryContent = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${id}`,
    { cache: "force-cache" }
  );

  const data = (await res.json()) as ComponentProps<
    typeof SortableProducts
  >["products"];
  const first = data[0];

  return (
    <main className="container mx-auto w-full max-w-7xl space-y-5 px-3 py-4 sm:px-5 sm:py-6 lg:px-8">
      {/* Responsive Header Card */}
      <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:gap-5 sm:rounded-3xl sm:p-5 md:p-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-2xl sm:h-14 sm:w-14 sm:rounded-2xl sm:text-3xl">
          {first?.categoryIcon ?? "🛒"}
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="break-words text-xl font-extrabold leading-snug text-gray-900 sm:text-2xl md:text-3xl">
            {first?.categoryNameBn ?? "পণ্য"}
          </h1>

          <p className="mt-1 text-xs leading-relaxed text-gray-600 sm:text-sm">
            {bn(data.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="min-w-0">
        <SortableProducts products={data} />
      </section>
    </main>
  );
};

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8 text-sm text-gray-500 sm:text-base">
          লোড হচ্ছে...
        </div>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
};

export default Page;

