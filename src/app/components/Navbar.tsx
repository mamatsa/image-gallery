import NavLinks from "./NavLinks";

const Navbar = () => {
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between border-b p-3">
      <h1 className="text-2xl font-bold">გალერეა</h1>
      <div className="xs:flex-row xs:gap-8 flex flex-col gap-2">
        <NavLinks />
      </div>
    </nav>
  );
};

export default Navbar;
