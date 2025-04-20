import { Styles } from "react-modal";

export const CLOSE_TIMEOUT_MS = 200;

const modalStyle: Styles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        // width: "45rem",
        maxHeight: "80vh",
        padding: "6rem",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
};

export default modalStyle;
