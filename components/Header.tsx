"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useMediaQuery } from "react-responsive";

function Header() {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });

  return (
    <header className="admin-header">
      <Link
        href="/"
        className="cursor-pointer">
        {isDesktopOrLaptop ? (
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit sm:hidden md:visible"
          />
        ) : (
          <Image
            src="/assets/icons/logo-icon.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit sm:hidden md:visible"
          />
        )}
      </Link>

      <div className="flex space-x-3">
        <Link
          href="/admin"
          className="text-16-semibold cursor-pointer text-gray-200">
          Admin Dashboard
        </Link>
        <Link
          href="/admin/doctors"
          className="text-16-semibold cursor-pointer text-green-200">
          Staffs
        </Link>
      </div>
    </header>
  );
}

export default Header;
