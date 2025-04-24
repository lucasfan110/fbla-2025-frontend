import { useEffect, useState } from "react";
import { useAuthVerified } from "./useAuth";
import backend from "../api/backend";
import getAuthToken from "../utils/getAuthToken";
import User from "../types/User";

export default function useStudentsFromAdmin() {
    const { user } = useAuthVerified();
    const [students, setStudents] = useState<User[]>([]);

    useEffect(() => {
        (async () => {
            const res = await backend.get("/students", {
                headers: {
                    Authorization: getAuthToken(),
                },
            });

            setStudents(res.data.data.students);
        })();
    }, [user]);

    return { students };
}
