import { Posting } from "../types/Posting";
import PostingCard from "./PostingCard";

interface Props {
    postingsList: Posting[];
}

export default function PostingCardList({ postingsList }: Props) {
    return postingsList.map(posting => (
        <PostingCard key={posting._id} {...posting} />
    ));
}
