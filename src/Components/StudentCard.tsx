import React from "react";
import backend from "../api/backend";
import User from "../types/User";
import getAuthToken from "../utils/getAuthToken";
import Button from "./Button";
import "./StudentCard.scss";

interface Props {
    student: User;
}

export default function StudentCard({ student }: Props) {
    async function onDeleteButtonClick(
        event: React.MouseEvent<HTMLButtonElement>
    ) {
        event.stopPropagation();

        await backend.delete(`/students/${student._id}`, {
            headers: { Authorization: getAuthToken() },
        });
        document.location.reload();
    }

    return (
        <div className="student-card">
            <i className="bi bi-people student-card__icon" />
            <div className="student-card__info-container">
                <div className="student-card__row student-card__first-row">
                    <h3 className="student-card__name">
                        {student.firstName} {student.lastName}
                    </h3>

                    <Button
                        className="student-card__delete-btn"
                        variation="danger"
                        onClick={onDeleteButtonClick}
                    >
                        <i className="bi bi-trash3"></i>
                    </Button>
                </div>
                <div className="student-card__row">
                    <div className="student-card__extra-info-container">
                        <div>
                            <i className="bi bi-envelope" /> {student.email}
                        </div>
                        <div>
                            <i className="bi bi-telephone" />{" "}
                            {student.phoneNumber}
                        </div>
                        <div>
                            <i className="bi bi-mortarboard" /> Grade:{" "}
                            {student.grade}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
