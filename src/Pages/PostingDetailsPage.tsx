import "mapbox-gl/dist/mapbox-gl.css";
import { useContext, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import backend from "../api/backend";
import AcceptOrReject from "../components/AcceptOrReject";
import Button from "../components/Button";
import PostingApplication from "../components/PostingApplication";
import Tags from "../components/Tags";
import { useAuthVerified } from "../hooks/useAuth";
import useMapDisplay from "../hooks/useMapDisplay";
import usePosting from "../hooks/usePosting";
import Status from "../types/Status";
import getAuthToken from "../utils/getAuthToken";
import NotificationButton from "./NotificationButton";
import "./PostingDetailsPage.scss";
import Section from "./Section";
import { EditPostingWindowContext } from "../contexts/EditPostingWindowContext";

export default function PostingDetailsPage() {
    const { postingId = "" } = useParams();
    const { user } = useAuthVerified();
    const { posting } = usePosting(postingId);
    const postingApplicationContainerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { openEditPostingWindow } = useContext(EditPostingWindowContext);

    const mapContainer = useRef<HTMLDivElement>(null);
    useMapDisplay(mapContainer, posting?.location);

    async function updatePostingStatus(status: Status) {
        const res = await backend.patch(
            `/users/${user._id}/postings/${postingId}`,
            {
                status,
            },
            {
                headers: {
                    Authorization: getAuthToken(),
                },
            }
        );

        if (res.data.status !== "success") {
            alert("Failed to update posting status!");
        }
    }

    async function handleStatusButtonClick(status: Status) {
        await updatePostingStatus(status);
        navigate("/dashboard");
    }

    if (!posting) {
        return null;
    }

    const { image, name, resources, tags, description, location } = posting;

    function renderResources() {
        return resources?.map((resource, index) => (
            <Link
                to={resource.link}
                key={index}
                className="posting-details-page__resource-link"
                target="_blank"
            >
                {resource.name}
            </Link>
        ));
    }

    return (
        <div className="posting-details-page">
            <div className="posting-details-page__banner-container">
                <img src={image} className="posting-details-page__banner" />
            </div>
            <div className="posting-details-page__content-container">
                <div className="posting-details-page__name-container">
                    <h2 className="posting-details-page__name">{name}</h2>
                    {user.role !== "student" && (
                        <>
                            <Button
                                className="posting-details-page__button"
                                onClick={e => {
                                    e.stopPropagation();
                                    openEditPostingWindow(postingId);
                                }}
                            >
                                <i className="bi bi-pencil-square"></i>
                            </Button>
                            <Button
                                className="posting-details-page__button"
                                variation="danger"
                                onClick={e => {
                                    e.stopPropagation();
                                    navigate(`delete`);
                                }}
                            >
                                <i className="bi bi-trash3" />
                            </Button>
                        </>
                    )}
                </div>
                <Tags tags={tags} className="posting-details-page__tags" />

                <p className="posting-details-page__section posting-details-page__description">
                    {description}
                </p>

                {user.role === "student" && (
                    <Button
                        variation="primary"
                        className="posting-details-page__apply-btn"
                        onClick={() =>
                            postingApplicationContainerRef.current?.scrollIntoView(
                                {
                                    behavior: "smooth",
                                    block: "start",
                                }
                            )
                        }
                    >
                        Apply Now!
                    </Button>
                )}

                <h3 className="posting-details-page__section-heading">
                    Location
                </h3>
                <Section>
                    <p className="posting-details-page__content posting-details-page__location">
                        {location}
                    </p>
                    <div
                        ref={mapContainer}
                        className="posting-details-page__location-map"
                    />
                </Section>

                <h3 className="posting-details-page__section-heading">
                    Resources
                </h3>
                <Section className="posting-details-page__resources-section">
                    <div>
                        <div className="posting-details-page__resources">
                            {renderResources()}
                        </div>
                    </div>
                </Section>

                {user.role === "admin" && (
                    <AcceptOrReject onClick={handleStatusButtonClick} />
                )}

                {user.role === "student" && (
                    <>
                        <h3 className="posting-details-page__section-heading">
                            Apply
                        </h3>

                        <div
                            ref={postingApplicationContainerRef}
                            className="posting-details-page__application-container"
                        >
                            <PostingApplication postingId={postingId} />
                        </div>
                    </>
                )}

                {user.role === "employer" && (
                    <NotificationButton
                        variation="primary"
                        className="posting-details-page__view-applications-btn"
                        notificationCount={posting.applicationCount}
                        onClick={() => navigate(`applications`)}
                    >
                        View Applications
                    </NotificationButton>
                )}
            </div>
        </div>
    );
}
