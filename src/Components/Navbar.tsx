import ReactModal from "react-modal";
import Button from "./Button";
import "./Navbar.scss";
import { useEffect, useState } from "react";
import modalStyle from "../Constants/modalStyle";
import LogInPage from "../Pages/LogInPage";
import SignUpPage from "../Pages/SignUpPage";

export default function Navbar() {
    const [logInModalOpen, setLogInModalOpen] = useState(false);
    const [signUpModalOpen, setSignUpModalOpen] = useState(false);

    useEffect(() => {
        let overflow;

        if (logInModalOpen || signUpModalOpen) {
            overflow = "hidden";
        } else {
            overflow = "visible";
        }

        document.body.style.overflowY = overflow;
    }, [logInModalOpen, signUpModalOpen]);

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
                    <Button onClick={() => setLogInModalOpen(true)}>
                        Log In
                    </Button>
                    <Button
                        variation="primary"
                        onClick={() => setSignUpModalOpen(true)}
                    >
                        Sign Up
                    </Button>
                </div>
            </nav>
            <ReactModal
                isOpen={logInModalOpen}
                contentLabel="Log In Modal"
                style={modalStyle}
                onRequestClose={() => setLogInModalOpen(false)}
                shouldCloseOnOverlayClick={true}
            >
                <Button
                    onClick={() => setLogInModalOpen(false)}
                    className="modal-close-button"
                >
                    <i className="bi bi-x-lg modal-close-button__icon" />
                </Button>
                <LogInPage
                    goToSignUp={() => {
                        setLogInModalOpen(false);
                        setSignUpModalOpen(true);
                    }}
                />
            </ReactModal>
            <ReactModal
                isOpen={signUpModalOpen}
                contentLabel="Sign Up Modal"
                style={modalStyle}
                onRequestClose={() => setSignUpModalOpen(false)}
                shouldCloseOnOverlayClick={true}
            >
                <Button
                    onClick={() => setSignUpModalOpen(false)}
                    className="modal-close-button"
                >
                    <i className="bi bi-x-lg modal-close-button__icon" />
                </Button>
                <SignUpPage />
            </ReactModal>
        </>
    );
}
