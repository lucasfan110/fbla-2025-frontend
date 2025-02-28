import PostingCardList from "../../components/PostingCardList";
import usePostingFromUserSchool from "../../hooks/usePostingFromUserSchool";

export default function AdminDashboard() {
    const pendingPostings = usePostingFromUserSchool({ status: "pending" });

    return (
        <div className="admin-dashboard">
            <h2 style={{ textAlign: "center" }}>Admin Dashboard</h2>
            <h2>Postings to Approve...</h2>

            <PostingCardList postingsList={pendingPostings} />
        </div>
    );
}
