"use client";
import { ClientLink } from "./link";
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
        <ClientLink href="/" aria-label="Go to home">
          <Heading level={2}>WhatSaidSaid</Heading>
        </ClientLink>
      </NavbarMobile>
    </NavbarProvider>
  );
};
