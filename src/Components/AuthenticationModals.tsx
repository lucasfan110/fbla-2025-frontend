import { useContext } from "react";
import ReactModal from "react-modal";
import modalStyle, { CLOSE_TIMEOUT_MS } from "../constants/modalStyle";
import { UserAuthFormContext } from "../contexts/UserAuthFormContext";
import usePreventScrolling from "../hooks/usePreventScrolling";
import LogInPage from "../pages/LogInPage";
import SignUpPage from "../pages/SignUpPage";
import Button from "./Button";

export default function AuthenticationModals() {
    const {
        state: { activeModal },
        closeModal,
    } = useContext(UserAuthFormContext);
    usePreventScrolling(activeModal !== "none");

    return (
        <>
            <ReactModal
                isOpen={activeModal === "logIn"}
                contentLabel="Log In Modal"
                style={modalStyle}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={true}
                closeTimeoutMS={CLOSE_TIMEOUT_MS}
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
                closeTimeoutMS={CLOSE_TIMEOUT_MS}
            >
                <Button onClick={closeModal} className="modal-close-button">
                    <i className="bi bi-x-lg modal-close-button__icon" />
                </Button>
                <SignUpPage />
            </ReactModal>
        </>
    );
}
