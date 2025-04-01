import { useState } from "react";
import Select from "react-select";
import useSchools, { schoolsToOptions } from "../hooks/useSchools";
import * as PostingHelper from "../utils/postingsHelper";
import Button from "./Button";
import FormInput from "./FormInput";
import FormTextArea from "./FormTextArea";
import "./PostingForm.scss";
import ResourceEditor from "./ResourceEditor";
import TagInput from "./TagInput";

interface Props {
    onFormSubmit?: (data: PostingHelper.FormData) => void;
    initialFormData?: PostingHelper.FormData;
    submitButtonLabel?: string;
}

export default function PostingForm({
    onFormSubmit,
    initialFormData = { name: "", schools: [] },
    submitButtonLabel = "Add Posting",
}: Props) {
    const [formData, setFormData] =
        useState<PostingHelper.FormData>(initialFormData);
    const schools = useSchools();

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                onFormSubmit?.(formData);
            }}
            className="posting-form"
        >
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
                className="posting-form__form-input"
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
                className="posting-form__select posting-form__form-input"
                options={schoolsToOptions(schools)}
                isMulti
                value={schoolsToOptions(
                    schools.filter(school =>
                        formData.schools.includes(school._id)
                    )
                )}
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
                className="posting-form__form-input"
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
                className="posting-form__form-input"
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
                className="posting-form__form-input"
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
                className="posting-form__form-input"
            />

            <label className="form-input__label">Resources</label>
            <ResourceEditor
                resources={formData.resources ?? []}
                setResources={resources =>
                    setFormData({ ...formData, resources })
                }
            />

            <Button variation="primary" className="posting-form__submit-btn">
                {submitButtonLabel}
            </Button>
        </form>
    );
}
