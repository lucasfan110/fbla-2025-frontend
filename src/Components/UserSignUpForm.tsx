import { useState } from "react";
import validator from "validator";
import User, { UserRole } from "../types/User";
import Dropdown from "./Dropdown";
import FormInput from "./FormInput";
import "./UserSignUpForm.scss";
import useSchools, { schoolsToOptions } from "../hooks/useSchools";

export interface SignUpFormData extends Omit<User, "_id"> {
    password: string;
}

interface Props {
    formData: SignUpFormData;
    setFormData: (data: SignUpFormData) => void;
}

export default function UserSignUpForm({ formData, setFormData }: Props) {
    const [confirmPassword, setConfirmPassword] = useState("");
    const schools = useSchools();

    return (
        <>
            <FormInput
                label="Email"
                placeholder="Email"
                id="email"
                type="email"
                className="user-sign-up-form__form-input"
                required
                disabled
                validate={[
                    {
                        validator: validator.isEmail,
                        invalidMessage: "Please put in a valid email",
                    },
                ]}
                value={formData.email}
                onChange={e => {
                    setFormData({
                        ...formData,
                        email: e.target.value,
                    });
                }}
            />

            <FormInput
                label="First Name"
                placeholder="First Name"
                id="first-name"
                className="user-sign-up-form__form-input"
                required
                validate={[
                    {
                        validator: v => v.length !== 0,
                        invalidMessage: "First name cannot be empty!",
                    },
                ]}
                value={formData.firstName}
                onChange={e => {
                    setFormData({
                        ...formData,
                        firstName: e.target.value,
                    });
                }}
            />

            <FormInput
                label="Last Name"
                placeholder="Last Name"
                id="last-name"
                className="user-sign-up-form__form-input"
                required
                validate={[
                    {
                        validator: v => v.length !== 0,
                        invalidMessage: "Last name cannot be empty!",
                    },
                ]}
                value={formData.lastName}
                onChange={e => {
                    setFormData({
                        ...formData,
                        lastName: e.target.value,
                    });
                }}
            />

            <FormInput
                label="Phone Number"
                placeholder="Phone Number"
                id="phone-number"
                className="user-sign-up-form__form-input"
                required
                validate={[
                    {
                        validator: validator.isMobilePhone,
                        invalidMessage: "Invalid phone number!",
                    },
                ]}
                value={formData.phoneNumber}
                onChange={e => {
                    setFormData({
                        ...formData,
                        phoneNumber: e.target.value,
                    });
                }}
            />

            <FormInput
                label="Password"
                placeholder="Password"
                id="password"
                type="password"
                className="user-sign-up-form__form-input"
                required
                validate={[
                    {
                        validator: v => v.length >= 8,
                        invalidMessage:
                            "Password must be at least 8 characters long!",
                    },
                ]}
                value={formData.password}
                onChange={e => {
                    setFormData({
                        ...formData,
                        password: e.target.value,
                    });
                }}
            />

            <FormInput
                label="Confirm Password"
                placeholder="Confirm Password"
                id="confirm-password"
                type="password"
                className="user-sign-up-form__form-input"
                required
                validate={[
                    {
                        validator: value => value === formData.password,
                        invalidMessage: "Password doesn't match!",
                    },
                ]}
                value={confirmPassword}
                onChange={e => {
                    setConfirmPassword(e.target.value);
                }}
            />

            <Dropdown
                label="User Role"
                options={[
                    // { value: "admin", label: "Admin" },
                    { value: "employer", label: "Employer" },
                    { value: "student", label: "Student" },
                ]}
                value={formData.role}
                onChange={value =>
                    setFormData({
                        ...formData,
                        role: value as UserRole,
                    })
                }
            />

            {formData.role === "student" && (
                <>
                    <FormInput
                        label="Grade"
                        placeholder="Grade"
                        id="grade"
                        type="number"
                        className="user-sign-up-form__form-input"
                        required
                        min={9}
                        max={12}
                        validate={[
                            {
                                validator: value => {
                                    const valueAsNumber = Number(value);
                                    return (
                                        valueAsNumber >= 9 &&
                                        valueAsNumber <= 12
                                    );
                                },
                                invalidMessage: "Grade must be between 9-12!",
                            },
                        ]}
                        value={formData.grade}
                        onChange={e => {
                            setFormData({
                                ...formData,
                                grade: e.target.valueAsNumber,
                            });
                        }}
                    />

                    <Dropdown
                        label="Your School"
                        required
                        options={schoolsToOptions(schools)}
                        value={formData.school}
                        onChange={value =>
                            setFormData({
                                ...formData,
                                school: value,
                            })
                        }
                    />
                </>
            )}
        </>
    );
}
