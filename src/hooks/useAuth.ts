import { useContext, useEffect, useRef, useState } from "react";
import { UserAuthContext } from "../contexts/UserAuthContext";
import User from "../types/User";
import backend from "../api/backend";
import { School } from "./useSchools";

export function useAuthVerified() {
    const auth = useAuth();
    return { ...auth, user: auth.user as User };
}

export function useAuthWithSchool() {
    const auth = useAuthVerified();

    const [school, setSchool] = useState<School | null>(null);

    useEffect(() => {
        (async () => {
            const response = await backend.get(`/schools/${auth.user.school}`);

            setSchool(response.data.data.school);
        })();
    }, [auth.user]);

    return { ...auth, school };
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
