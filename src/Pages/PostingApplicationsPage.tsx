import { useParams } from "react-router-dom";
import PostingApplicationCard from "../components/PostingApplicationCard";
import usePostingApplications from "../hooks/usePostingApplications";

export default function PostingApplicationsPage() {
    const { postingId = "" } = useParams();
    const applications = usePostingApplications(postingId, {
        status: "pending",
    });

    return (
        <div className="posting-applications-page">
            {applications.map(application => (
                <PostingApplicationCard
                    application={application}
                    key={application._id}
                />
            ))}
        </div>
    );
}
