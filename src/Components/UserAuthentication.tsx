import { useContext, useEffect, useState } from "react";
import backend from "../api/backend";
import User from "../types/User";
import Button from "./Button";
import "./UserAuthentication.scss";
import UserProfile from "./UserProfile";
import { UserAuthFormContext } from "../context/UserAuthFormContext";

export default function UserAuthentication() {
    const [user, setUser] = useState<User | null>(null);

    const { openLogInModal, openSignUpModal } = useContext(UserAuthFormContext);

    useEffect(() => {
        (async () => {
            const jwt = localStorage.getItem("jwt");

            if (!jwt) {
                return;
            }

            const res = await backend.get("/users/get-user-from-token", {
                headers: { Authorization: `Bearer ${jwt}` },
            });

            if (res.data.status === "success") {
                setUser(res.data.user);
            } else {
                localStorage.removeItem("jwt");
            }
        })();
    }, []);

    if (!user) {
        return (
            <div className="user-authentication">
                <Button onClick={openLogInModal}>Log In</Button>
                <Button variation="primary" onClick={openSignUpModal}>
                    Sign Up
                </Button>
            </div>
        );
    }

    return (
        <div className="user-authentication">
            <UserProfile user={user} />
        </div>
    );
}
