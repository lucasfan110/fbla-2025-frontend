import { useParams } from "react-router-dom";
import PostingApplicationCard from "../components/PostingApplicationCard";
import usePostingApplications from "../hooks/usePostingApplications";
import "./PostingApplicationsPage.scss";

export default function PostingApplicationsPage() {
    const { postingId = "" } = useParams();
    const applications = usePostingApplications(postingId, {
        status: "pending",
    });

    return (
        <div className="posting-applications-page">
            {applications.length === 0 && (
                <div className="u-gray-text">
                    There are no pending applications for this posting!
                </div>
            )}

            {applications.map(application => (
                <PostingApplicationCard
                    application={application}
                    key={application._id}
                />
            ))}
        </div>
    );
}
