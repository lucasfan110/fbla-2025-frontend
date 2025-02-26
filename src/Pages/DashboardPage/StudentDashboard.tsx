import PostingCardList from "../../components/PostingCardList";
import usePostingFromUserSchool from "../../hooks/usePostingFromUserSchool";

export default function StudentDashboard() {
    const postings = usePostingFromUserSchool({ status: "approved" });

    return (
        <div>
            <h2>Postings to Apply For</h2>

            <PostingCardList postingsList={postings} showStatus={false} />
        </div>
    );
}
