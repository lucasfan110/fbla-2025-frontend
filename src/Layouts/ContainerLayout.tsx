import { Outlet } from "react-router-dom";
import "./ContainerLayout.scss";

interface Props {
    children?: React.ReactNode;
}

export default function ContainerLayout({ children }: Props) {
    return (
        <>
            <div className="container-layout">{children ?? <Outlet />}</div>
        </>
    );
}
