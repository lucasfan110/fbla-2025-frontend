import backend from "../api/backend";
import { useAuthVerified } from "../hooks/useAuth";
import { Application } from "../types/Application";
import Status from "../types/Status";
import getAuthToken from "../utils/getAuthToken";
import AcceptOrReject from "./AcceptOrReject";
import "./PostingApplicationCard.scss";

interface Props {
    application: Application;
}

export default function PostingApplicationCard({
    application: { student, response, _id },
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
        <div className="posting-application-card">
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

            <AcceptOrReject onClick={updateApplicationStatus} />
        </div>
    );
}
