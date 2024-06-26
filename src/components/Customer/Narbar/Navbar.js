import React, { useContext, useEffect, useState } from "react";
import "./Navbar.scss";
import {
  NavLink,
  useLocation,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../../../context/UserContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../../logo.png";
import { getUserAccount, logoutUser } from "../../../servises/userService";
import { toast } from "react-toastify";

const CompanyNav = (props) => {
  const { user, logoutContext } = useContext(UserContext);
  const location = useLocation();
  const history = useHistory();

  const handleLogout = async () => {
    let data = await logoutUser(); // clear cookies
    localStorage.removeItem("jwt"); // clear local storage
    logoutContext(); // clear user in context
    if (data && +data.EC === 0) {
      toast.success("Logout succeeds...");
      history.push("/login");
    } else {
      toast.error(data.EM);
    }
  };

  const [userValid, setUserValid] = useState("");
  const checkUser = async () => {
    let response = await getUserAccount();
    if (response && response.EC === 0) {
      let group = response.DT.groupWithRoles.name;
      setUserValid(group);
    } else {
      setUserValid("");
    }
  };

  useEffect(() => {
    checkUser();
  }, [userValid, user]);

  if (
    (user && user.isAuthenticated === true) ||
    location.pathname === "/company"
  ) {
    return (
      <>
        <div className="navbar-light bg-light">
          <div className="nav-header container">
            <Navbar expand="lg" className="bg-body-tertiary" bg="header">
              <Navbar.Brand href="/company">
                <h3 className="brand">
                  <img
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top mx-3"
                    alt="Logo"
                  />
                  <span className="brand-name">Hotel</span>
                </h3>
              </Navbar.Brand>
              <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <NavLink to="/hotels" className="nav-link">
                      Hotels
                    </NavLink>
                  </Nav>
                  <Nav>
                    <Nav.Item className="nav-link welcome">
                      WELCOME {user.account.username} !
                    </Nav.Item>

                    <NavDropdown title="Settings" id="basic-nav-dropdown">
                      <NavDropdown.Item>Change Password</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item>
                        <span onClick={() => handleLogout()}>Log out</span>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default CompanyNav;
