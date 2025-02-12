import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/Navbar";

interface Props {
    children?: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
    return (
        <>
            <Navbar />
            {children ?? <Outlet />}
            <ScrollRestoration />
        </>
    );
}
