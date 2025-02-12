import { useEffect } from "react";
import ReactModal from "react-modal";
import modalStyle from "../constants/modalStyle";
import LogInPage from "../pages/LogInPage";
import SignUpPage from "../pages/SignUpPage";
import "./AuthenticationModals.scss";
import Button from "./Button";

interface Props {
    logInModalOpen: boolean;
    setLogInModalOpen: (value: boolean) => void;
    signUpModalOpen: boolean;
    setSignUpModalOpen: (value: boolean) => void;
}

export default function AuthenticationModals({
    logInModalOpen,
    setLogInModalOpen,
    signUpModalOpen,
    setSignUpModalOpen,
}: Props) {
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
                <SignUpPage
                    goToLogIn={() => {
                        setSignUpModalOpen(false);
                        setLogInModalOpen(true);
                    }}
                />
            </ReactModal>
        </>
    );
}
