import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href={"/"}
      className="font-bold text-3xl bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent hover:cursor-pointer"
    >
      FormWise
    </Link>
  );
};

export default Logo;
