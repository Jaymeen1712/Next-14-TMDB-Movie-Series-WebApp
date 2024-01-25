"use client";

import React from "react";
import {
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import { HEADER_TRANSPARENT, dashboardMenuItems } from "@/utils";
import Logo from "@/components/logo";
import { usePathname } from "next/navigation";
import Search from "./search/search";

const Header = () => {
  const pathname = usePathname();
  const selectedMenuItem = pathname.split("/")[1];

  const menuItems = dashboardMenuItems.map((item) => (
    <NavbarItem key={item.key}>
      <Link
        href={item.link}
        className={`hover:text-primary ${
          selectedMenuItem === item.key ? "text-primary" : "text-white"
        }`}
      >
        {item.name.toUpperCase()}
      </Link>
    </NavbarItem>
  ));

  return (
    <Navbar
      className={`hello m-0 bg-neutral-950 shadow items-center ${
        HEADER_TRANSPARENT.includes(selectedMenuItem.toLowerCase()) &&
        "bg-0 absolute left-0 right-0 top-0"
      }`}
      height={"90px"}
      position="static"
      maxWidth="2xl"
    >
      <NavbarBrand className="justify-center">
        <Link href="/">
          <Logo />
        </Link>
      </NavbarBrand>

      <NavbarContent justify="start" className="gap-12">
        <NavbarItem>
          <Search />
        </NavbarItem>

        {/* Menu Items */}
        <NavbarContent justify="end">
          <div className="mx-10 flex flex-row space-x-12">{menuItems}</div>
        </NavbarContent>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
