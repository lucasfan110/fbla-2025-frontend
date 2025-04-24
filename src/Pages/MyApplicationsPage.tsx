import { useEffect, useState } from "react";
import backend from "../api/backend";
import ApplicationCard from "../components/ApplicationCard";
import { useAuthVerified } from "../hooks/useAuth";
import { Application } from "../types/Application";
import getAuthToken from "../utils/getAuthToken";
import "./MyApplicationsPage.scss";

export default function MyApplicationsPage() {
    const { user } = useAuthVerified();
    const [applications, setApplications] = useState<Application[]>([]);

    console.log(applications);

    useEffect(() => {
        (async () => {
            const res = await backend.get(`/users/${user._id}/applications`, {
                headers: {
                    Authorization: getAuthToken(),
                },
            });

            if (res.data.status === "success") {
                setApplications(res.data.data.applications);
            }
        })();
    }, [user]);

    return (
        <div className="my-applications-page">
            {/* <Button
                variation="primary"
                onClick={() => navigate("/dashboard")}
                className="my-applications-page__back-btn"
            >
                Back to Dashboard
            </Button> */}

            {applications.length === 0 && (
                <div className="u-gray-text">
                    You don't have any applications! Apply for a posting by
                    clicking into a posting and apply from there!
                </div>
            )}

            {applications.map(application => (
                <ApplicationCard
                    key={application._id}
                    application={application}
                />
            ))}
        </div>
    );
}
