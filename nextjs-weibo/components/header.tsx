import React, { useState } from "react";
import { Navbar, NavDropdown, Nav } from 'react-bootstrap'
import { UserState } from '../store/modules/user';
import { useRouter } from "next/router";
interface IProps extends UserState {
  onLogout: Function
}

export default function Header(props: IProps) {
  const { id, name, onLogout } = props
  const router = useRouter()

  const handleLogout = () => {
    onLogout()
    router.replace('/')
  }
  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Weibo</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Nav>
            {id && <Nav.Link href="/user-list">User list</Nav.Link>}
            {
              id ? (
                <>
                  <NavDropdown title={name} id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Acount</NavDropdown.Item>
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                  <>
                    <Nav.Link href="/sign-in">Sign In</Nav.Link>
                  </>
                )
            }

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header >
  );
}
