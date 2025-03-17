import PostingCardList from "../../components/PostingCardList";
import usePostingFromUserSchool from "../../hooks/usePostingFromUserSchool";
import "./AdminDashboard.scss";

export default function AdminDashboard() {
    const pendingPostings = usePostingFromUserSchool({ status: "pending" });

    return (
        <div className="admin-dashboard">
            <h2 style={{ textAlign: "center" }}>Admin Dashboard</h2>
            <h2>Postings to Approve...</h2>

            {pendingPostings.length === 0 && (
                <p className="admin-dashboard__no-posting">
                    No postings to approve!
                </p>
            )}

            <PostingCardList postingsList={pendingPostings} />
        </div>
    );
}
