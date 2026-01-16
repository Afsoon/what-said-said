"use client";
import { Navbar, NavbarItem, NavbarMobile, NavbarProvider, NavbarTrigger } from "./ui/navbar";

export const AppNavbar = () => {
  return (
    <NavbarProvider>
      <Navbar>
        <NavbarItem href="/">Home</NavbarItem>
        <NavbarItem href="/blog">Blog</NavbarItem>
        <NavbarItem href="/til">TIL</NavbarItem>
      </Navbar>
      <NavbarMobile>
        <NavbarTrigger />
        <NavbarItem href="/">Home</NavbarItem>
        <NavbarItem href="/blog">Blog</NavbarItem>
        <NavbarItem href="/til">TIL</NavbarItem>
      </NavbarMobile>
    </NavbarProvider>
  );
};
