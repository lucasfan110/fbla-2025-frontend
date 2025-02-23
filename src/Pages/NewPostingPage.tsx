import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import backend from "../api/backend";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import ResourceEditor from "../components/ResourceEditor";
import TagInput from "../components/TagInput";
import { useAuthVerified } from "../hooks/useAuth";
import { Posting } from "../types/Posting";
import "./NewPostingPage.scss";
import FormTextArea from "../components/FormTextArea";

type FormData = Omit<Posting, "employer" | "applications" | "_id">;

export default function NewPostingPage() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        schools: [],
    });
    const [allSchools, setAllSchools] = useState<
        { _id: string; name: string }[]
    >([]);
    const { user } = useAuthVerified();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const schools = await backend.get("/schools", {
                params: { fields: "name" },
            });

            setAllSchools(schools.data.data.schools);
        })();
    }, []);

    async function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const res = await backend.post(
            `/users/employers/${user._id}/postings`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            }
        );

        if (res.data.status === "success") {
            navigate("/dashboard");
        } else {
            alert("Failed to create posting!");
        }
    }

    return (
        <div className="new-posting-page">
            <form onSubmit={onFormSubmit} className="new-posting-page__form">
                {/* 
					A default submit button to prevent submitting when user 
					press enter when typing on input due to the tag input 
				*/}
                <button
                    type="submit"
                    disabled
                    style={{ display: "none" }}
                    aria-hidden="true"
                ></button>

                <FormInput
                    label="Name"
                    placeholder="Name"
                    id="name"
                    className="new-posting-page__form-input"
                    required
                    value={formData.name}
                    onChange={e => {
                        setFormData({
                            ...formData,
                            name: e.target.value,
                        });
                    }}
                />

                <label className="form-input__label">
                    Schools
                    <span className="form-input__required">*</span>
                </label>
                <Select
                    className="new-posting-page__select new-posting-page__form-input"
                    options={allSchools.map(school => ({
                        label: school.name,
                        value: school._id,
                    }))}
                    isMulti
                    onChange={schools =>
                        setFormData({
                            ...formData,
                            schools: schools.map(school => school.value),
                        })
                    }
                    required
                />

                <FormTextArea
                    label="Description"
                    placeholder="Description"
                    id="description"
                    className="new-posting-page__form-input"
                    value={formData.description}
                    onChange={e => {
                        setFormData({
                            ...formData,
                            description: e.target.value,
                        });
                    }}
                />

                <FormInput
                    label="Image"
                    placeholder="Put an image URL here..."
                    id="image-url"
                    className="new-posting-page__form-input"
                    value={formData.image}
                    onChange={e => {
                        setFormData({
                            ...formData,
                            image: e.target.value,
                        });
                    }}
                />

                <FormInput
                    label="Location"
                    placeholder="Location"
                    id="location"
                    className="new-posting-page__form-input"
                    value={formData.location}
                    onChange={e => {
                        setFormData({
                            ...formData,
                            location: e.target.value,
                        });
                    }}
                />

                <label className="form-input__label">Tags</label>
                <TagInput
                    id="tags"
                    placeholder="Type in the tag and press enter to add tag..."
                    tags={formData.tags}
                    onTagsChange={tags => {
                        setFormData(data => ({
                            ...data,
                            tags,
                        }));
                    }}
                    className="new-posting-page__form-input"
                />

                <label className="form-input__label">Resources</label>
                <ResourceEditor
                    resources={formData.resources ?? []}
                    setResources={resources =>
                        setFormData({ ...formData, resources })
                    }
                />

                <Button
                    variation="primary"
                    className="new-posting-page__submit-btn"
                >
                    Add Posting
                </Button>
            </form>
        </div>
    );
}
