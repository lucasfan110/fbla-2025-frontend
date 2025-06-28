import classNames from "classnames";
import backend from "../api/backend";
import { useAuthVerified } from "../hooks/useAuth";
import { Application } from "../types/Application";
import Status from "../types/Status";
import getAuthToken from "../utils/getAuthToken";
import AcceptOrReject from "./AcceptOrReject";
import "./PostingApplicationCard.scss";
import ResumeDisplay from "./ResumeDisplay";

export interface AIResult {
    applicantId: string;
    rank: number;
    rationale: string;
}

interface Props {
    application: Application;
    aiResult?: AIResult;
}

export default function PostingApplicationCard({
    application: {
        student,
        response,
        _id,
        resumeFile: { filename },
    },
    aiResult,
}: Props) {
    const { user } = useAuthVerified();

    async function updateApplicationStatus(status: Status) {
        const res = await backend.patch(
            `/users/${user._id}/applications/${_id}/${status}`,
            {},
            { headers: { Authorization: getAuthToken() } }
        );

        if (res.data.status === "success") {
            document.location.reload();
        } else {
            alert("Failed to update application status");
        }
    }

    return (
        <div
            className={classNames("posting-application-card", {
                "ai-ranked": aiResult !== undefined,
            })}
        >
            {aiResult !== undefined && (
                <div className="posting-application-card__ai-result">
                    <div className="posting-application-card__ai-result-title-container">
                        <h3>AI Ranking: </h3>
                    </div>
                    <p>
                        <strong>Rank: </strong>
                        {aiResult.rank}
                    </p>
                    <p>
                        <strong>Rationale: </strong>
                        {aiResult.rationale}
                    </p>
                </div>
            )}

            <h3>
                {student.firstName} {student.lastName}
            </h3>
            <p>
                {student.school.name}, Grade {student.grade}
            </p>
            <div className="posting-application-card__contact-info">
                <div>
                    <i className="bi bi-envelope" /> {student.email}
                </div>
                <div>
                    <i className="bi bi-telephone" /> {student.phoneNumber}
                </div>
            </div>

            <p>
                <strong>Response: </strong> {response}
            </p>

            <p>
                <strong>Resume: </strong>
            </p>
            <ResumeDisplay applicationId={_id} fileName={filename} />

            <AcceptOrReject onClick={updateApplicationStatus} />
        </div>
    );
}
