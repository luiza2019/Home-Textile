import React, { useState } from "react";
import logo from "../../images/logo.png";
import { Button } from "@mui/material";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import "./authpage.css";

const AuthMain = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showLogin, setShowLogin] = useState(false);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

    return (
        <div className="authMain">
            <div className="authIMGdiv">
                <img className="logo" src={logo} alt="" />
            </div>
            <div className="authMainRight">
                <h1>Wellcome</h1>
                <Button onClick={handleShow}>Sign Up</Button>
                <Button onClick={handleShowLogin}>Sing In</Button>
            </div>
            <SignUp handleClose={handleClose} show={show} />
            <SignIn handleCloseLogin={handleCloseLogin} showLogin={showLogin} />
        </div>
    );
};

export default AuthMain;
