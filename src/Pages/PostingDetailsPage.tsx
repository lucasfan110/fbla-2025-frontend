import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import backend from "../api/backend";
import Button from "../components/Button";
import Tags from "../components/Tags";
import { useAuthVerified } from "../hooks/useAuth";
import useMapDisplay from "../hooks/useMapDisplay";
import { Posting, Status } from "../types/Posting";
import getAuthToken from "../util/getAuthToken";
import "./PostingDetailsPage.scss";
import Section from "./Section";

export default function PostingDetailsPage() {
    const { postingId } = useParams();
    const { user } = useAuthVerified();
    const [posting, setPosting] = useState<Posting | null>(null);
    const navigate = useNavigate();

    const mapContainer = useRef<HTMLDivElement>(null);
    useMapDisplay(mapContainer, posting?.location);

    useEffect(() => {
        (async () => {
            const res = await backend.get(
                `/users/${user._id}/postings/${postingId}`,
                {
                    headers: {
                        Authorization: getAuthToken(),
                    },
                }
            );

            setPosting(res.data.data.posting);
        })();
    }, [user, postingId]);

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

    function handleStatusButtonClick(status: Status) {
        updatePostingStatus(status);
        navigate("/dashboard");
    }

    if (!posting) {
        return null;
    }

    const { image, name, _id, resources, tags, description, location } =
        posting;

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
            <div className="posting-details-page__name-container">
                <h2 className="posting-details-page__name">{name}</h2>
                <Button
                    className={`posting-details-page__button`}
                    onClick={e => {
                        e.stopPropagation();
                        navigate(`/dashboard/postings/${_id}/edit`);
                    }}
                >
                    <i className="bi bi-pencil-square"></i>
                </Button>
                <Button
                    className={`posting-details-page__button`}
                    variation="danger"
                    onClick={e => {
                        e.stopPropagation();
                        navigate(`/dashboard/postings/${_id}/delete`);
                    }}
                >
                    <i className="bi bi-trash3"></i>
                </Button>
            </div>
            <Tags tags={tags} className="posting-details-page__tags" />
            <p className="posting-details-page__section posting-details-page__description">
                {description}
            </p>

            <h3 className="posting-details-page__section-heading">Location</h3>
            <Section>
                <p className="posting-details-page__content posting-details-page__location">
                    {location}
                </p>
                <div
                    ref={mapContainer}
                    className="posting-details-page__location-map"
                />
            </Section>

            <h3 className="posting-details-page__section-heading">Resources</h3>
            <Section className="posting-details-page__resources-section">
                <div>
                    <div className="posting-details-page__resources">
                        {renderResources()}
                    </div>
                </div>
            </Section>

            {user.role === "admin" && (
                <div className="posting-details-page__admin-section">
                    <Button
                        variation="safe"
                        onClick={() => handleStatusButtonClick("approved")}
                    >
                        Accept
                    </Button>
                    <Button
                        variation="danger"
                        onClick={() => handleStatusButtonClick("rejected")}
                    >
                        Reject
                    </Button>
                </div>
            )}
        </div>
    );
}
