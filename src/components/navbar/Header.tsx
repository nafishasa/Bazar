
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const Header = ({ data }: { data: Category[] }) => {
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <div className="flex w-full flex-wrap items-center gap-2 sm:gap-3">
      <Link
        href="/"
        className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:px-4 sm:text-base ${
          isHome
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-blue-100"
        }`}
      >
        🏠 Home
      </Link>

      {data.map((category) => {
        const href = `/category/${category.id}`;
        const isActive = pathname === href;

        return (
          <Link
            key={category.id}
            href={href}
            className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:px-4 sm:text-base ${
              isActive
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-blue-100"
            }`}
          >
            {category.icon} {category.nameBn}
          </Link>
        );
      })}
    </div>
  );
};

export default Header;