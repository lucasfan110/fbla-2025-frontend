import PostingCardList from "../../components/PostingCardList";
import usePostingsFromUserSchool from "../../hooks/usePostingsFromUserSchool";
import "./StudentDashboard.scss";

export default function StudentDashboard() {
    const postings = usePostingsFromUserSchool({ status: "approved" });

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
