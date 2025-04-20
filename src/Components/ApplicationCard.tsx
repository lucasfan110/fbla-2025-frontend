import { useNavigate } from "react-router-dom";
import { Application } from "../types/Application";
import capitalize from "../utils/capitalize";
import "./ApplicationCard.scss";
import Button from "./Button";

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

            <Button
                variation="primary"
                className="application-card__check-posting-btn"
            >
                Check Posting
            </Button>
        </div>
    );
}
