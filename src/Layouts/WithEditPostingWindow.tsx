import { Outlet } from "react-router-dom";
import { EditPostingWindowProvider } from "../contexts/EditPostingWindowContext";
import EditPostingModal from "../components/EditPostingModal";

interface Props {
    children?: React.ReactNode;
}

export default function WithEditPostingWindow({ children }: Props) {
    return (
        <EditPostingWindowProvider>
            {children ?? <Outlet />}
            <EditPostingModal />
        </EditPostingWindowProvider>
    );
}
