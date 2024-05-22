//xác thực người dung và dữ liệu tài khoản 
import React, { useState, useEffect } from "react";
import { getUserAccount } from "../servises/userService";

const UserContext = React.createContext(null);// trạng thái tài khoản


const UserProvider = ({ children }) => {
  const userDefault = {
    isLoading: true,
    isAuthenticated: false,
    token: "",
    account: {},
  };

  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState(userDefault);

  // Login updates the user data with a name parameter
  const loginContext = (userData) => {
    setUser({ ...userData, isLoading: false });
  };

  // Logout updates the user data to default
  const logoutContext = () => {
    setUser({ ...userDefault, isLoading: false });
  };

  const fetchUSer = async () => {

    let response = await getUserAccount();
    if (response && response.EC === 0) {
      let groupWithRoles = response.DT.groupWithRoles;
      let email = response.DT.email;
      let username = response.DT.username;
      let token = response.DT.access_token;
      let userId = response.DT.userId;

      let data = {
        isAuthenticated: true,
        token,
        account: {
          groupWithRoles,
          email,
          username,
          userId,
        },
        isLoading: false,
      };
      setUser(data);
    } else {
      setUser({ ...userDefault, isLoading: false });
    }
  };

  useEffect(() => {
    fetchUSer();
  }, []);

  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext, fetchUSer }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
