import { useEffect, useState } from "react";
import backend from "../api/backend";
import googleOauth, { GoogleAccountInfo } from "../api/google-oauth";
import Button from "../components/Button";
import SchoolForm, { SchoolData } from "../components/SchoolForm";
import UserSignUpForm, { SignUpFormData } from "../components/UserSignUpForm";
import "./FinishSignUpPage.scss";

const DEFAULT_FORM_DATA: SignUpFormData = {
    role: "student",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    grade: 9,
};

const DEFAULT_SCHOOL_DATA: SchoolData = {
    description: "",
    email: "",
    image: "",
    location: "",
    name: "",
    phoneNumber: "",
    resources: [],
};

function getAccessToken(): string {
    const hash = window.location.hash;
    const queryString = hash.includes("?") ? hash.split("?")[1] : "";

    const urlParams = new URLSearchParams(queryString);
    const accessToken = urlParams.get("accessToken");

    return accessToken || "";
}

async function fetchUserInfo(): Promise<GoogleAccountInfo> {
    const res = await googleOauth.get("/userinfo", {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
    });

    if (res.data.error) {
        throw new Error(res.data.error);
    }

    return res.data;
}

function sendMessageAndCloseWindow(type: string, payload: unknown) {
    window.opener.postMessage(
        {
            type,
            payload,
        },
        window.location.origin
    );

    window.close();
}

export default function FinishSignUpPage() {
    const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
    const [schoolData, setSchoolData] = useState(DEFAULT_SCHOOL_DATA);

    // Populate form data
    useEffect(() => {
        (async () => {
            const userInfo = await fetchUserInfo();
            const { email, name } = userInfo;
            setFormData(formData => ({ ...formData, email, firstName: name }));
        })();
    }, []);

    async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const res = await backend.post("/users/signup", {
            userData: formData,
            schoolData,
        });

        if (res.data.status === "success") {
            sendMessageAndCloseWindow("SIGNUP_FORM_SUCCESS", res.data.token);
        } else {
            sendMessageAndCloseWindow("SIGNUP_FORM_ERROR", null);
        }
    }

    return (
        <div className="finish-sign-up-page">
            <div className="finish-sign-up-page__container">
                <header className="finish-sign-up-page__header">
                    <h2 className="finish-sign-up-page__title">
                        Finish signing up
                    </h2>
                </header>

                <div className="finish-sign-up-page__body">
                    <form onSubmit={handleFormSubmit}>
                        <UserSignUpForm
                            formData={formData}
                            setFormData={setFormData}
                        />

                        {formData.role === "admin" && (
                            <SchoolForm
                                schoolData={schoolData}
                                setSchoolData={setSchoolData}
                            />
                        )}

                        <Button
                            variation="primary"
                            className="finish-sign-up-page__submit-button"
                        >
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
