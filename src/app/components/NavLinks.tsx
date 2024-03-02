"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <>
      <Link
        href="/"
        className={`link ${pathname === "/" ? "font-bold" : "hover:text-gray-500"}`}
      >
        მთავარი
      </Link>
      <Link
        href="/history"
        className={`link ${pathname === "/history" ? "font-bold" : "hover:text-gray-500"}`}
      >
        ისტორია
      </Link>
    </>
  );
};
export default NavLinks;
