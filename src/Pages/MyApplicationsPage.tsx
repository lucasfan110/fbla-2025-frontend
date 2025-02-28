import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import backend from "../api/backend";
import ApplicationCard from "../components/ApplicationCard";
import Button from "../components/Button";
import { useAuthVerified } from "../hooks/useAuth";
import { Application } from "../types/Application";
import getAuthToken from "../util/getAuthToken";
import "./MyApplicationsPage.scss";

export default function MyApplicationsPage() {
    const { user } = useAuthVerified();
    const [applications, setApplications] = useState<Application[]>([]);
    const navigate = useNavigate();

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
            <Button
                variation="primary"
                onClick={() => navigate("/dashboard")}
                className="my-applications-page__back-btn"
            >
                Back to Dashboard
            </Button>

            {applications.map(application => (
                <ApplicationCard
                    key={application._id}
                    application={application}
                />
            ))}
        </div>
    );
}
