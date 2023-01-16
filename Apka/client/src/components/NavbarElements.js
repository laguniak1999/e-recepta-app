import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  list-style-type: none;
  margin-bottom: 10px;
  margin-top: -40px;
  margin-left: 1560px;
  padding: 0;
  width: 260px;
  background-color: #f1f1f1;
`;

export const Header = styled.nav`
  text-align: center;
`;

export const NavLink = styled(Link)`
  font-size: 20px;
  display: block;
  color: #000;
  padding: 8px 16px;
  text-decoration: none;
  cursor: pointer;
  &.active {
    color: #4d4dff;
  }
`;

export const NavMenu = styled.div`
  background-color: rgb(0, 88, 115);
`;
