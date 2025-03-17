import { useNavigate } from "react-router-dom";
import { Application } from "../types/Application";
import "./ApplicationCard.scss";
import capitalize from "../util/capitalize";

interface Props {
    application: Application;
}

export default function ApplicationCard({ application }: Props) {
    const navigate = useNavigate();

    return (
        <div
            className="application-card"
            onClick={() =>
                navigate(`/dashboard/postings/${application.posting._id}`)
            }
        >
            <h3>
                Application for: <strong>{application.posting.name}</strong>
            </h3>

            <div className="application-card__response-container">
                <strong>Your Response:</strong>
                <p className="application-card__response">
                    {application.response}
                </p>
            </div>

            <div>
                <strong>Status: </strong>
                {capitalize(application.status)}
            </div>
        </div>
    );
}
