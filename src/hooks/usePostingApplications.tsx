import { useEffect, useRef, useState } from "react";
import { Application } from "../types/Application";
import backend from "../api/backend";
import { useAuthVerified } from "./useAuth";
import getAuthToken from "../util/getAuthToken";

export default function usePostingApplications(
    postingId: string,
    params?: object
) {
    const { user } = useAuthVerified();
    const [applications, setApplications] = useState<Application[]>([]);
    const postingIdRef = useRef(postingId);
    const paramsRef = useRef(params);

    useEffect(() => {
        (async () => {
            const res = await backend.get(
                `/users/${user._id}/postings/${postingIdRef.current}/applications`,
                {
                    headers: {
                        Authorization: getAuthToken(),
                    },
                    params: paramsRef.current,
                }
            );

            if (res.data.status === "success") {
                setApplications(res.data.data.applications);
            }
        })();
    }, [user]);

    return applications;
}
