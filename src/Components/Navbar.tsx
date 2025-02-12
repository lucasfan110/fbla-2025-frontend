import { useState } from "react";
import AuthenticationModals from "./AuthenticationModals";
import "./Navbar.scss";
import UserAuthentication from "./UserAuthentication";

export default function Navbar() {
    const [logInModalOpen, setLogInModalOpen] = useState(false);
    const [signUpModalOpen, setSignUpModalOpen] = useState(false);

    return (
        <>
            <nav className="navbar">
                <div className="navbar__item navbar__justify-left">
                    <div className="navbar__logo">
                        FC
                        <span className="navbar__second-c">C</span>
                    </div>
                </div>
                <div className="navbar__item navbar__justify-center"></div>
                <div className="navbar__item navbar__justify-right">
                    <UserAuthentication
                        setLogInModalOpen={setLogInModalOpen}
                        setSignUpModalOpen={setSignUpModalOpen}
                    />
                </div>
            </nav>
            <AuthenticationModals
                logInModalOpen={logInModalOpen}
                setLogInModalOpen={setLogInModalOpen}
                signUpModalOpen={signUpModalOpen}
                setSignUpModalOpen={setSignUpModalOpen}
            />
        </>
    );
}
