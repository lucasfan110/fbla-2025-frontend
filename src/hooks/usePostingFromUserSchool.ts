import { useEffect, useRef, useState } from "react";
import backend from "../api/backend";
import Posting from "../types/Posting";
import getAuthToken from "../util/getAuthToken";
import { useAuthVerified } from "./useAuth";

export default function usePostingFromUserSchool(extraParams: object) {
    const { user } = useAuthVerified();

    const [postings, setPostings] = useState<Posting[]>([]);
    const extraParamsRef = useRef(extraParams);

    useEffect(() => {
        (async () => {
            const res = await backend.get(`/users/${user._id}/postings`, {
                params: {
                    schools: user.school,
                    ...extraParamsRef.current,
                },
                headers: {
                    Authorization: getAuthToken(),
                },
            });

            setPostings(res.data.data.postings);
        })();
    }, [user]);

    return postings;
}
