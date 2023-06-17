import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <span className="text-[2rem] font-dancing cursor-pointer hover:text-primary transition-all ">
        Feane
      </span>
    </Link>
  );
};

export default Logo;
