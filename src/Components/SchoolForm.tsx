import validator from "validator";
import FormInput from "./FormInput";
import "./SchoolForm.scss";
import ResourceEditor from "./ResourceEditor";

export interface SchoolResource {
    name: string;
    link: string;
}

export interface SchoolData {
    name: string;
    image: string;
    description: string;
    location: string;
    phoneNumber: string;
    email: string;
    resources: SchoolResource[];
}

interface Props {
    schoolData: SchoolData;
    setSchoolData: (schoolData: SchoolData) => void;
}

export default function SchoolForm({ schoolData, setSchoolData }: Props) {
    return (
        <div className="school-form">
            <div className="school-form__header">
                <h3 className="school-form__title">School Data</h3>
                <p className="school-form__description">
                    Add the information about the school that the admin will
                    manage!
                </p>
            </div>

            <FormInput
                label="Name"
                placeholder="Name"
                id="name"
                className="school-form__form-input"
                required
                validate={[
                    {
                        validator: v => v.length !== 0,
                        invalidMessage: "School name cannot be empty!",
                    },
                ]}
                value={schoolData.name}
                onChange={e => {
                    setSchoolData({
                        ...schoolData,
                        name: e.target.value,
                    });
                }}
            />

            <FormInput
                label="Email"
                placeholder="Email"
                id="email"
                type="email"
                className="school-form__form-input"
                validate={[
                    {
                        validator: validator.isEmail,
                        invalidMessage: "Please put in a valid email",
                    },
                ]}
                value={schoolData.email}
                onChange={e => {
                    setSchoolData({
                        ...schoolData,
                        email: e.target.value,
                    });
                }}
            />

            <FormInput
                label="Image URL"
                placeholder="Image URL"
                id="image-url"
                className="school-form__form-input"
                value={schoolData.image}
                onChange={e => {
                    setSchoolData({
                        ...schoolData,
                        image: e.target.value,
                    });
                }}
            />

            <FormInput
                label="Description"
                placeholder="Description"
                id="description"
                className="school-form__form-input"
                value={schoolData.description}
                onChange={e => {
                    setSchoolData({
                        ...schoolData,
                        description: e.target.value,
                    });
                }}
            />

            <FormInput
                label="Location"
                placeholder="Location"
                id="location"
                className="school-form__form-input"
                value={schoolData.location}
                onChange={e => {
                    setSchoolData({
                        ...schoolData,
                        location: e.target.value,
                    });
                }}
            />

            <FormInput
                label="Phone Number"
                placeholder="Phone Number"
                id="phone-number"
                className="school-form__form-input"
                validate={[
                    {
                        validator: validator.isMobilePhone,
                        invalidMessage: "Please input a valid phone number!",
                    },
                ]}
                value={schoolData.phoneNumber}
                onChange={e => {
                    setSchoolData({
                        ...schoolData,
                        phoneNumber: e.target.value,
                    });
                }}
            />

            <label className="form-input__label">Resources</label>
            <ResourceEditor
                resources={schoolData.resources}
                setResources={resources =>
                    setSchoolData({ ...schoolData, resources })
                }
            />
        </div>
    );
}
