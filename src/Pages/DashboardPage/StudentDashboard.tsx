import PostingCardList from "../../components/PostingCardList";
import usePostingFromUserSchool from "../../hooks/usePostingFromUserSchool";
import "./StudentDashboard.scss";

export default function StudentDashboard() {
    const postings = usePostingFromUserSchool({ status: "approved" });

    return (
        <div className="student-dashboard">
            <h2 style={{ textAlign: "center" }}>Student Dashboard</h2>
            <div className="student-dashboard__heading">
                <h2>Postings to Apply For</h2>
            </div>

            <PostingCardList
                postingsList={postings}
                showStatus={false}
                readOnly
            />
        </div>
    );
}
