import "./App.scss";

import AdminNav from "./components/Admin/Navbar/AdminNav";
import CustomerNav from "./components/Customer/Narbar/Navbar";
import AdminRoutes from "./routes/AdminRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect, useState, useContext } from "react";

import { Rings } from "react-loader-spinner";
import { UserContext } from "./context/UserContext";
import Scrollbars, { ScrollbarProps } from "react-custom-scrollbars";

import ClientRoutes from "./routes/ClientRoutes";
const App = () => {
    const { user } = useContext(UserContext);
    const [scrollHeight, setScrollHeight] = useState(0);

    useEffect(() => {
        let windowHeight = window.innerHeight;
        setScrollHeight(windowHeight);
        console.log("user:");
        console.log(user);
    }, [user]);

    return (
        <Scrollbars autoHide style={{ height: scrollHeight }}>
            <Router>
                {user && user.isLoading ? (
                    <div className="loading-container">
                        <Rings
                            heigth="100"
                            width="100"
                            color="#1877f2"
                            ariaLabel="loading"
                        />
                        <div>Loading data...</div>
                    </div>
                ) : (
                    <>
                        {user &&
                            user.account &&
                            user.account.groupWithRoles &&
                            user.account.groupWithRoles.name === "Admin" ? (
                            <>
                                <div className="containerAdmin">
                                    <div className="app-header">
                                        <AdminNav />
                                    </div>

                                    <div className="app-container">
                                        <AdminRoutes />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {user &&
                                    user.account &&
                                    user.account.groupWithRoles &&
                                    user.account.groupWithRoles.name === "Customer" ? (
                                    <>
                                        <div className="app-header">
                                            <CustomerNav />
                                        </div>
                                        <div className="app-container">
                                           
                                        </div>
                                    </>
                                ) : (


                                    <>
                                        <div className="containerClient">
                                            <div className="app-header">
                                                <ClientRoutes />
                                            </div>
                                        </div>
                                    </>


                                )}
                            </>

                        )}
                    </>
                )}
            </Router>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Scrollbars>
    );
};

export default App;


