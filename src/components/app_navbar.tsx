"use client";
import { Heading } from "./ui/heading";
import { Navbar, NavbarItem, NavbarMobile, NavbarProvider, NavbarTrigger } from "./ui/navbar";

export const AppNavbar = () => {
  return (
    <NavbarProvider>
      <Navbar intent="inset">
        <Heading level={2}>WhatSaidSaid</Heading>
        <NavbarItem href="/">Home</NavbarItem>
        <NavbarItem href="/blog">Blog</NavbarItem>
        <NavbarItem href="/til">TIL</NavbarItem>
      </Navbar>
      <NavbarMobile>
        <NavbarTrigger />
        <Heading level={2}>WhatSaidSaid</Heading>
      </NavbarMobile>
    </NavbarProvider>
  );
};
