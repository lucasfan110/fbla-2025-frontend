import { useEffect, useState } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import ChatbotWindow from "../components/ChatbotWindow";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";

interface Props {
    children?: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
    const { logIn } = useAuth();
    const [triedLoggingIn, setTriedLoggingIn] = useState(false);

    useEffect(() => {
        (async () => {
            await logIn(() => {
                localStorage.removeItem("jwt");
            });

            setTriedLoggingIn(true);
        })();
    }, [logIn]);

    if (!triedLoggingIn) {
        return null;
    }

    return (
        <>
            <Navbar />
            {children ?? <Outlet />}
            <ChatbotWindow />
            <ScrollRestoration />
        </>
    );
}
