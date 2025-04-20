import { useContext } from "react";
import ReactModal from "react-modal";
import modalStyle, { CLOSE_TIMEOUT_MS } from "../constants/modalStyle";
import { EditPostingWindowContext } from "../contexts/EditPostingWindowContext";
import usePosting from "../hooks/usePosting";
import usePreventScrolling from "../hooks/usePreventScrolling";
import EditPostingPage from "../pages/EditPostingPage";
import Button from "./Button";

export default function EditPostingModal() {
    const {
        state: { postingId },
        closeEditPostingWindow,
    } = useContext(EditPostingWindowContext);

    const { posting } = usePosting(postingId);
    usePreventScrolling(posting !== null);

    return (
        <ReactModal
            isOpen={posting !== null}
            contentLabel="Edit Posting Modal"
            style={modalStyle}
            onRequestClose={closeEditPostingWindow}
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={CLOSE_TIMEOUT_MS}
        >
            <Button
                onClick={closeEditPostingWindow}
                className="modal-close-button"
            >
                <i className="bi bi-x-lg modal-close-button__icon" />
            </Button>
            <EditPostingPage posting={posting} />
        </ReactModal>
    );
}
