import { useEffect, useState } from "react";
import Posting from "../types/Posting";
import * as PostingHelper from "../utils/postingsHelper";
import { useAuthVerified } from "./useAuth";

export default function usePosting(postingId: string | null) {
    const [posting, setPosting] = useState<Posting | null>(null);
    const { user } = useAuthVerified();

    useEffect(() => {
        (async () => {
            console.log("from hook", postingId);

            if (!postingId) {
                setPosting(null);
                return;
            }

            const res = await PostingHelper.getPostings(user._id, postingId);
            setPosting(res.data.data.posting);
        })();
    }, [user, postingId]);

    return { posting };
}
