import Posting from "../types/Posting";
import PostingCard from "./PostingCard";

interface Props {
    postingsList: Posting[];
    showStatus?: boolean;
    readOnly?: boolean;
    showApplicationCount?: boolean;
}

export default function PostingCardList({
    postingsList,
    showStatus,
    readOnly,
    showApplicationCount,
}: Props) {
    return postingsList.map(posting => (
        <PostingCard
            key={posting._id}
            showStatus={showStatus}
            readOnly={readOnly}
            showApplicationCount={showApplicationCount}
            {...posting}
        />
    ));
}
