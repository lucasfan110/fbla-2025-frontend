import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function LogoutPage() {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    useEffect(() => {
        logOut();
        navigate("/");
    }, [navigate, logOut]);

    return null;
}
