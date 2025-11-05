import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-16 flex justify-center items-center text-white text-4xl text-bold bg-gradient-to-r from-yellow-200 via-amber-500 to-amber-700">
      <Link href="/">CakeMate</Link>
    </header>
  );
};

export default Header;
