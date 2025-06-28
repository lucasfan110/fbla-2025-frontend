import { useEffect, useState } from "react";
import backend from "../api/backend";
import ApplicationCard from "../components/ApplicationCard";
import { useAuthVerified } from "../hooks/useAuth";
import { Application } from "../types/Application";
import getAuthToken from "../utils/getAuthToken";
import "./MyApplicationsPage.scss";
import LoadingText from "../components/LoadingText";

export default function MyApplicationsPage() {
    const { user } = useAuthVerified();
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await backend.get(`/users/${user._id}/applications`, {
                headers: {
                    Authorization: getAuthToken(),
                },
            });

            if (res.data.status === "success") {
                setApplications(res.data.data.applications);
                setIsLoading(false);
            }
        })();
    }, [user]);

    function renderHintText() {
        if (isLoading) {
            return <LoadingText />;
        } else if (applications.length === 0) {
            return (
                <div className="u-gray-text">
                    You don't have any applications! Apply for a posting by
                    clicking into a posting and apply from there!
                </div>
            );
        }
    }

    return (
        <div className="my-applications-page">
            {renderHintText()}

            {applications.map(application => (
                <ApplicationCard
                    key={application._id}
                    application={application}
                />
            ))}
        </div>
    );
}
