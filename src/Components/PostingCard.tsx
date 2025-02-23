import { useNavigate } from "react-router-dom";
import sanitizeHTML from "sanitize-html";
import Tags from "./Tags";
import "./PostingCard.scss";
import { Posting } from "../types/Posting";
import Button from "./Button";
import StatusText from "./StatusText";

export default function PostingCard({
    _id,
    name,
    tags,
    location,
    image,
    description,
    status,
}: Posting) {
    const navigate = useNavigate();

    function handleCompanyCardClick() {
        navigate(`/dashboard/company/${_id}`);
    }

    return (
        <div className="posting-card" onClick={handleCompanyCardClick}>
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

                        <StatusText status={status} />
                    </div>

                    <div className="posting-card__icon-buttons">
                        <Button
                            className="posting-card__icon-button"
                            onClick={e => {
                                e.stopPropagation();
                                navigate(`/employer/edit-posting/${_id}`);
                            }}
                        >
                            <i className="bi bi-pencil-square"></i>
                        </Button>
                        <Button
                            className="posting-card__icon-button"
                            variation="danger"
                            onClick={e => {
                                e.stopPropagation();
                                navigate(`/employer/delete-posting/${_id}`);
                            }}
                        >
                            <i className="bi bi-trash3"></i>
                        </Button>
                    </div>
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
