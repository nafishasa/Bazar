
import TodayDate from "../time/TodayTime";
import Header from "./Header";
import Profile from "../userinfo/Profile";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const Navbar = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
    {
      cache: "force-cache",
    }
  );

  const data: Category[] = await res.json();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Main Header */}
      <div className="flex flex-col gap-3 border-b border-slate-200 py-4 sm:flex-row sm:items-center sm:justify-between sm:py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-800 text-xl font-bold text-white sm:h-11 sm:w-11 sm:text-2xl">
            🛒
          </div>

          <div className="min-w-0">
            <p className="text-xl font-bold text-gray-800 sm:text-2xl">
              বাজার দর
            </p>
            <div className="text-xs text-gray-600 sm:text-sm">
              <TodayDate />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end">
          <Profile />
        </div>
      </div>

      {/* Category Navbar */}
      <div className="py-3">
        <Header data={data} />
      </div>
    </div>
  );
};

export default Navbar;