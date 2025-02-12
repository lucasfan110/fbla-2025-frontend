import { useEffect, useState } from "react";
import backend from "../api/backend";
import User from "../types/User";
import Button from "./Button";
import "./UserAuthentication.scss";
import UserProfile from "./UserProfile";

interface Props {
    setLogInModalOpen: (value: boolean) => void;
    setSignUpModalOpen: (value: boolean) => void;
}

export default function UserAuthentication({
    setLogInModalOpen,
    setSignUpModalOpen,
}: Props) {
    const [user, setUser] = useState<User | null>(null);

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
                <Button onClick={() => setLogInModalOpen(true)}>Log In</Button>
                <Button
                    variation="primary"
                    onClick={() => setSignUpModalOpen(true)}
                >
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
