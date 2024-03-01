import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between border-b p-3">
      <h1 className="text-2xl font-bold">გალერეა</h1>
      <div className="gap-8 sm:flex">
        <Link href="/" className="font-medium hover:text-gray-500">
          მთავარი
        </Link>
        <Link href="/history" className="hover:text-gray-500">
          ისტორია
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
