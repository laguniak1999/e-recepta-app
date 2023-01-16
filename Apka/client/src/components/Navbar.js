import React from "react";
import { Nav, NavLink, NavMenu, Header } from "./NavbarElements";
import { Outlet } from "react-router";

const Navbar = () => {
  return (
    <Nav>
      <Header></Header>
      <NavMenu>
        <NavLink to="/Add">Wyślij receptę</NavLink>
        <NavLink to="/Patient">Dodaj pacjenta</NavLink>
        <NavLink to="/Search">Szukaj recept</NavLink>
        <NavLink to="/PaperVersion">Ostatnio wysłana recepta</NavLink>
      </NavMenu>
    </Nav>
  );
};

export default () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
