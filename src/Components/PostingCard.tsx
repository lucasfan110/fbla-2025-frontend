import { useNavigate } from "react-router-dom";
import sanitizeHTML from "sanitize-html";
import Posting from "../types/Posting";
import Button from "./Button";
import "./PostingCard.scss";
import StatusText from "./StatusText";
import Tags from "./Tags";
import Notification from "./Notification";

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
}: Props) {
    const navigate = useNavigate();

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
                <div className="posting-card__space-between">
                    <div className="posting-card__name-container">
                        <h3
                            className="posting-card__name"
                            dangerouslySetInnerHTML={{
                                __html: sanitizeHTML(name),
                            }}
                        ></h3>

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
                                    navigate(`/dashboard/postings/${_id}/edit`);
                                }}
                            >
                                <i className="bi bi-pencil-square"></i>
                            </Button>
                            <Button
                                className="posting-card__icon-button"
                                variation="danger"
                                onClick={e => {
                                    e.stopPropagation();
                                    navigate(
                                        `/employer/postings/${_id}/delete`
                                    );
                                }}
                            >
                                <i className="bi bi-trash3"></i>
                            </Button>
                        </div>
                    )}
                </div>
                <div className="posting-card__location">{location}</div>
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
                <div className="posting-card__summary">{description}</div>
                <div className="posting-card__tags">
                    <Tags tags={tags} />
                </div>
            </div>
        </div>
    );
}
