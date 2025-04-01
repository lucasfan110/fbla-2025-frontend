import Posting from "../types/Posting";
import PostingCard from "./PostingCard";

interface Props {
    postingsList: Posting[];
    showStatus?: boolean;
    readOnly?: boolean;
    showApplicationCount?: boolean;
    onEditPosting?: (postingIndex: number) => void;
}

export default function PostingCardList({
    postingsList,
    showStatus,
    readOnly,
    showApplicationCount,
    onEditPosting,
}: Props) {
    return postingsList.map((posting, index) => (
        <PostingCard
            key={posting._id}
            showStatus={showStatus}
            readOnly={readOnly}
            showApplicationCount={showApplicationCount}
            onEditPosting={() => onEditPosting?.(index)}
            {...posting}
        />
    ));
}
