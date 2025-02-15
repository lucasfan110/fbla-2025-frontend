import { useContext, useEffect } from "react";
import ReactModal from "react-modal";
import modalStyle from "../constants/modalStyle";
import LogInPage from "../pages/LogInPage";
import SignUpPage from "../pages/SignUpPage";
import "./AuthenticationModals.scss";
import Button from "./Button";
import { UserAuthFormContext } from "../context/UserAuthFormContext";

export default function AuthenticationModals() {
    const {
        state: { activeModal },
        closeModal,
    } = useContext(UserAuthFormContext);

    useEffect(() => {
        let overflow;

        if (activeModal !== "none") {
            overflow = "hidden";
        } else {
            overflow = "visible";
        }

        document.body.style.overflowY = overflow;
    }, [activeModal]);

    return (
        <>
            <ReactModal
                isOpen={activeModal === "logIn"}
                contentLabel="Log In Modal"
                style={modalStyle}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={true}
            >
                <Button onClick={closeModal} className="modal-close-button">
                    <i className="bi bi-x-lg modal-close-button__icon" />
                </Button>
                <LogInPage />
            </ReactModal>
            <ReactModal
                isOpen={activeModal === "signUp"}
                contentLabel="Sign Up Modal"
                style={modalStyle}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={true}
            >
                <Button onClick={closeModal} className="modal-close-button">
                    <i className="bi bi-x-lg modal-close-button__icon" />
                </Button>
                <SignUpPage />
            </ReactModal>
        </>
    );
}
