import PostingCardList from "../../components/PostingCardList";
import { useAuthWithSchool } from "../../hooks/useAuth";
import usePostingsFromUserSchool from "../../hooks/usePostingsFromUserSchool";
import "./AdminDashboard.scss";

export default function AdminDashboard() {
    const pendingPostings = usePostingsFromUserSchool({ status: "pending" });
    const reviewedPostings = usePostingsFromUserSchool().filter(
        posting => posting.status !== "pending"
    );
    const { school } = useAuthWithSchool();

    return (
        <div className="admin-dashboard">
            <h1 className="admin-dashboard__title">Admin Dashboard</h1>
            <h3 className="u-text-center u-gray-text">{school?.name}</h3>

            <h2 className="admin-dashboard__subtitle">
                Postings to Approve...
            </h2>
            {pendingPostings.length === 0 && (
                <p className="u-gray-text">No postings to approve!</p>
            )}
            <PostingCardList postingsList={pendingPostings} />

            <h2 className="admin-dashboard__subtitle">Reviewed Postings</h2>
            {reviewedPostings.length === 0 && (
                <p className="u-gray-text">No reviewed postings</p>
            )}
            <PostingCardList postingsList={reviewedPostings} />
        </div>
    );
}
