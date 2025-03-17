import { useContext, useRef } from "react";
import { UserAuthContext } from "../context/UserAuthContext";
import User from "../types/User";

export function useAuthVerified() {
    const auth = useAuth();
    return { ...auth, user: auth.user as User };
}

export default function useAuth() {
    const {
        state: { user },
        logIn,
        logOut,
    } = useContext(UserAuthContext);

    const logInRef = useRef(logIn);
    const logOutRef = useRef(logOut);

    return { user, logIn: logInRef.current, logOut: logOutRef.current };
}
