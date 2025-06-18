import PostingCardList from "../../components/PostingCardList";
import usePostingsFromUserSchool from "../../hooks/usePostingsFromUserSchool";
import "./AdminDashboard.scss";

export default function AdminDashboard() {
    const pendingPostings = usePostingsFromUserSchool({ status: "pending" });

    return (
        <div className="admin-dashboard">
            <h1 className="admin-dashboard__title">Admin Dashboard</h1>
            <h2 className="admin-dashboard__subtitle">
                Postings to Approve...
            </h2>

            {pendingPostings.length === 0 && (
                <p className="admin-dashboard__no-posting">
                    No postings to approve!
                </p>
            )}

            <PostingCardList postingsList={pendingPostings} />
        </div>
    );
}
