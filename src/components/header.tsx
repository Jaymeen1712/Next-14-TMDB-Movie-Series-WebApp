"use client";

import Logo from "@/components/logo";
import { HEADER_TRANSPARENT, dashboardMenuItems } from "@/utils";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Search from "./search/search";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const selectedMenuItem = pathname.split("/")[1];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (link: string) => {
    router.push(link);
    setIsMenuOpen(false); // Close mobile menu after navigation
  };

  const menuItems = dashboardMenuItems.map((item) => (
    <NavbarItem key={item.key} className="hidden lg:flex">
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
      className={`m-0 items-center bg-neutral-950 shadow ${
        HEADER_TRANSPARENT.includes(selectedMenuItem.toLowerCase()) &&
        "bg-0 absolute left-0 right-0 top-0"
      }`}
      height={"90px"}
      position="static"
      maxWidth="full"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Mobile menu toggle */}
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="text-white lg:hidden"
      />

      {/* Logo - centered on mobile, left on desktop */}
      <NavbarBrand className="justify-center lg:justify-start">
        <button onClick={() => handleNavigation("/")}>
          <Logo />
        </button>
      </NavbarBrand>

      {/* Desktop Navigation */}
      <NavbarContent justify="center" className="hidden gap-8 lg:flex">
        <NavbarItem>
          <Search />
        </NavbarItem>
        {menuItems}
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="bg-neutral-950/95 backdrop-blur-md">
        <div className="flex flex-col space-y-4 pt-6">
          <div className="px-4">
            <Search />
          </div>
          {dashboardMenuItems.map((item) => (
            <NavbarMenuItem key={item.key}>
              <button
                onClick={() => handleNavigation(item.link)}
                className={`w-full px-4 py-3 text-left text-lg transition-colors hover:text-primary ${
                  selectedMenuItem === item.key ? "text-primary" : "text-white"
                }`}
              >
                {item.name.toUpperCase()}
              </button>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
