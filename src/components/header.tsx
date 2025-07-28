"use client";

import Logo from "@/components/logo";
import { HEADER_TRANSPARENT, dashboardMenuItems } from "@/utils";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import Search from "./search/search";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const selectedMenuItem = pathname.split("/")[1];

  const handleNavigation = (link: string) => {
    router.push(link);
  };

  const menuItems = dashboardMenuItems.map((item) => (
    <NavbarItem key={item.key}>
      <button
        onClick={() => handleNavigation(item.link)}
        className={`transition-colors hover:text-primary ${
          selectedMenuItem === item.key ? "text-primary" : "text-white"
        }`}
      >
        {item.name.toUpperCase()}
      </button>
    </NavbarItem>
  ));

  return (
    <Navbar
      className={`hello m-0 items-center bg-neutral-950 shadow ${
        HEADER_TRANSPARENT.includes(selectedMenuItem.toLowerCase()) &&
        "bg-0 absolute left-0 right-0 top-0"
      }`}
      height={"90px"}
      position="static"
      maxWidth="2xl"
    >
      <NavbarBrand className="justify-center">
        <button onClick={() => handleNavigation("/")}>
          <Logo />
        </button>
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
