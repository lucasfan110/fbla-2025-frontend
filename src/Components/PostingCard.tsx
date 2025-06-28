import { convertDistance, getDistance } from "geolib";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import sanitizeHTML from "sanitize-html";
import { EditPostingWindowContext } from "../contexts/EditPostingWindowContext";
import { useAuthVerified } from "../hooks/useAuth";
import useUserLocation from "../hooks/useUserLocation";
import Posting from "../types/Posting";
import * as PostingHelper from "../utils/postingsHelper";
import Button from "./Button";
import Notification from "./Notification";
import "./PostingCard.scss";
import StatusText from "./StatusText";
import Tags from "./Tags";

interface Props extends Posting {
    showStatus?: boolean;
    readOnly?: boolean;
    showApplicationCount?: boolean;
}

export default function PostingCard({
    _id,
    name,
    tags,
    location,
    image,
    description,
    status,
    applicationCount,
    showStatus = true,
    readOnly = false,
    showApplicationCount = false,
    hourlySalary,
    coordinates,
}: Props) {
    const navigate = useNavigate();
    const { user } = useAuthVerified();
    const { openEditPostingWindow } = useContext(EditPostingWindowContext);
    const { userCoords } = useUserLocation();

    return (
        <div
            className="posting-card"
            onClick={() => navigate(`/dashboard/postings/${_id}`)}
        >
            <div className="posting-card__thumbnail-container">
                {/* <ImageOrDefault
                    src={image}
                    alt="thumbnail"
                    className="posting-card__thumbnail"
                /> */}
                <img
                    src={image}
                    alt="thumbnail"
                    className="posting-card__thumbnail"
                />
            </div>
            <div className="posting-card__content">
                <div className="posting-card__title-container">
                    <div className="posting-card__name-container">
                        <h3
                            className="posting-card__name"
                            dangerouslySetInnerHTML={{
                                __html: sanitizeHTML(name),
                            }}
                        ></h3>
                    </div>

                    <div className="posting-card__extra-info-container">
                        <div className="posting-card__extra-info">
                            {showStatus && <StatusText status={status} />}
                            {showApplicationCount && (
                                <Notification
                                    notificationCount={applicationCount}
                                />
                            )}
                        </div>

                        {!readOnly && (
                            <div className="posting-card__icon-buttons">
                                <Button
                                    className="posting-card__icon-button"
                                    onClick={e => {
                                        e.stopPropagation();
                                        openEditPostingWindow(_id);
                                    }}
                                >
                                    <i className="bi bi-pencil-square"></i>
                                </Button>
                                <Button
                                    className="posting-card__icon-button"
                                    variation="danger"
                                    onClick={async event => {
                                        event.stopPropagation();
                                        await PostingHelper.deletePosting(
                                            user._id,
                                            _id
                                        );
                                        window.location.reload();
                                    }}
                                >
                                    <i className="bi bi-trash3"></i>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="posting-card__location">
                    {location}{" "}
                    {userCoords &&
                        `(${Math.round(
                            convertDistance(
                                getDistance(userCoords, coordinates),
                                "mi"
                            )
                        )} miles)`}
                </div>
                {/* <div className="posting-card__contact-info">
                    <div className="posting-card__phone-number">
                        <i className="bi bi-telephone" />
                        &nbsp;
                        {phoneNumber}
                    </div>
                    <div className="posting-card__email">
                        <i className="bi bi-envelope" />
                        &nbsp;
                        {email}
                    </div>
                </div> */}
                <div className="posting-card__hourly-salary">
                    <strong>Salary: </strong>
                    {hourlySalary ? `$${hourlySalary}/hr` : "Unpaid"}
                </div>
                <div
                    className="posting-card__summary"
                    dangerouslySetInnerHTML={{
                        __html: sanitizeHTML(description || ""),
                    }}
                />
                <div className="posting-card__tags">
                    <Tags tags={tags} />
                </div>
            </div>
        </div>
    );
}
