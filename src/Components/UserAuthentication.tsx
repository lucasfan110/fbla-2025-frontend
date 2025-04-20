import { useContext } from "react";
import { UserAuthFormContext } from "../contexts/UserAuthFormContext";
import useAuth from "../hooks/useAuth";
import Button from "./Button";
import "./UserAuthentication.scss";
import UserProfile from "./UserProfile";

export default function UserAuthentication() {
    const { openLogInModal, openSignUpModal } = useContext(UserAuthFormContext);
    const { user } = useAuth();

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
