import { useEffect, useState, useContext } from "react";
import "./Login.scss";
import { useHistory, Link } from "react-router-dom";

import { toast } from "react-toastify";
import { loginUser } from "../../servises/userService";
import { UserContext } from "../../context/UserContext";
import logo from "../../logo.png";
import React from 'react';
import ReactDOM from 'react-dom';
// import Root from '../../Root'; // Import Root component from Root.js
import reportWebVitals from '../../reportWebVitals';
// const renderApp = () => {
//   ReactDOM.render(<Root />, document.getElementById('root'));
// };

const Login = (props) => {
  const { user, loginContext } = useContext(UserContext);
  let history = useHistory();


  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");
  const [group, setGroup] = useState(null);

  const defaultObjValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  };

  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleCreateNewAccount = () => {
    history.push("/register");
  };

  const handleLogin = async () => {
    setObjValidInput(defaultObjValidInput);
    if (!valueLogin) {
      setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false });
      toast.error("Please enter your email address or phone number");
      return;
    }



    if (!password) {
      setObjValidInput({ ...defaultObjValidInput, isValidPassword: false });
      toast.error("Please enter your password");
      return;
    }

    let response = await loginUser(valueLogin, password);

    if (response && +response.EC === 0) {
      // Success
      let groupWithRoles = response.DT.groupWithRoles;
      let email = response.DT.email;
      let username = response.DT.username;
      let token = response.DT.access_token;
      let groupId = response.DT.groupWithRoles.id;
      let data = {
        isAuthenticated: true,
        token,
        account: {
          groupWithRoles,
          email,
          username,
        },

      };
      setGroup(groupId);


      localStorage.setItem("pbl3_hotel", token);
      loginContext(data);

      history.push("/");
      if (true) {

        // window.location.reload();
      }

    }

    if (response && +response.EC !== 0) {
      // ERROR
      toast.error(response.EM);
    }
  };


  const handlePressEnter = (event) => {
    if (event.code === "Enter") {
      handleLogin();

    }
  };

  useEffect(() => {
    if (user && user.isAuthenticated) {
      // history.push("/");

      // renderApp();

      history.push("/");
    }
    // console.log(">>check log:   huhuh");
    //   renderApp();

  }, [group]);
  const returnToHomePage = () => {
    history.push("/");
  };
  return (
    <>
      <div className="wrapper">
        <div className="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
          <div className="container-fluid">
            <div className="row row-cols-1 row-cols-lg-1">
              <div className="col mx-auto">
                <div className="card">
                  <div className="card-body">
                    <div className="border p-4 rounded">
                      <div className="text-center">
                        <img
                          src={logo}
                          width="30"
                          height="30"
                          className="d-inline-block align-top me-3"
                          alt="Logo"
                        />
                        <h3 className="">Login</h3>
                      </div>
                      <p>
                        Don't have an account yet?
                        <Link to="/register">Register here</Link>
                      </p>
                      <div className="form-body">
                        <form className="row g-3">
                          <div className="col-12">
                            <label for="inputEmailAddress" className="form-label">
                              Email Address
                            </label>
                            <input
                              type="text"
                              className={
                                objValidInput.isValidValueLogin
                                  ? "form-control"
                                  : "form-control is-invalid"
                              }
                              placeholder="Email address or phone number"
                              value={valueLogin}
                              onChange={(event) => {
                                setValueLogin(event.target.value);
                              }}
                            />
                          </div>
                          <div className="col-12">
                            <label for="inputChoosePassword" className="form-label">
                              Enter Password
                            </label>
                            <div className="input-group" id="show_hide_password">
                              <input
                                type="password"
                                className={
                                  objValidInput.isValidPassword
                                    ? "form-control"
                                    : "form-control is-invalid"
                                }
                                placeholder="Password"
                                value={password}
                                onChange={(event) => {
                                  setPassword(event.target.value);
                                }}
                                onKeyDown={(event) => handlePressEnter(event)}
                              />
                            </div>
                          </div>
                          <div className="col-md-12 d-inline-block text-center">
                            <Link to="#">Forgot Password?</Link>
                          </div>
                          <div className="col-12">
                            <div className="d-grid">
                              <button
                                className="btn btn-primary"
                                onClick={(e) => {
                                  e.preventDefault(); // Ngăn chặn hành vi mặc định của sự kiện
                                  handleLogin();
                                }}
                              >
                                Login
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Login;
