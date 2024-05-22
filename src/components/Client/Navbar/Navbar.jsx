import "./Navbar.scss";
import {
  Link,
  NavLink,
  useLocation,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import Nav from "react-bootstrap/Nav";
import { logoutUser } from "../../../servises/userService";
import { toast } from "react-toastify";
import NavDropdown from "react-bootstrap/NavDropdown";
const Navbar = () => {
  const { user, logoutContext } = useContext(UserContext);
  const history = useHistory();

  const handleLogout = async () => {
    let data = await logoutUser(); // clear cookies
    localStorage.removeItem("pbl3_hotel"); // clear local storage
    logoutContext(); // clear user in context
    if (data && +data.EC === 0) {
      toast.success("Logout succeeds...");
      history.push("/login");
    } else {
      toast.error(data.EM);
    }
  };
  return (
    <div className="navbarClient">
      <div className="navContainer">


        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">booking.com</span>
        </Link>

        {/* 
                {user && user.isAuthenticated === true ? user.account.username : (
                    <div className="navItems">
                        <button className="navButton">Register</button>
                        <button className="navButton">Login</button>
                    </div>
                )} */}
        <Nav>
          {user && user.isAuthenticated === true ? (
            <>
          
               
              <NavDropdown title={`${user.account.username}`} className="NavDropdown" id="basic-nav-dropdown">
                <NavDropdown.Item>Change Password</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <span onClick={() => handleLogout()}>Log out</span>
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <Link className="nav-link" to="/login">
              <button
                className="btn btn-outline-info me-2 mb-1"
                type="button"
              >
                Đăng Nhập
              </button>
            </Link>
          )}
        </Nav>
      </div>
    </div>
  );
};

export default Navbar;