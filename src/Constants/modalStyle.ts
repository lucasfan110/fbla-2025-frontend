import { Styles } from "react-modal";

const modalStyle: Styles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "45rem",
        maxHeight: "80vh",
        padding: "6rem",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
};

export default modalStyle;
