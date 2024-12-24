import { useState } from "react";
import FormInput from "../Components/FormInput";
import "./LogInPage.scss";
import validator from "validator";
import Button from "../Components/Button";
import SeparatorWithElement from "../Components/SeparatorWithElement";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { BACKEND_SERVER_ADDRESS } from "../Utils/constants";
import ErrorText from "../Components/ErrorText";

export type LogInFormData = {
    email: string;
    password: string;
};

const INITIAL_FORM_DATA: LogInFormData = {
    email: "",
    password: "",
};

interface Props {
    goToSignUp: () => void;
}

export default function LogInPage({ goToSignUp }: Props) {
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [errorElement, setErrorElement] = useState<React.ReactNode>(null);

    const login = useGoogleLogin({
        onSuccess: onGoogleLogin,
        onError: () =>
            setErrorElement(
                <>Failed to log in with Google! Please try again later!</>
            ),
    });

    async function onGoogleLogin(response: TokenResponse) {
        const res = await fetch(
            `${BACKEND_SERVER_ADDRESS}/api/v1/users/google-auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: response.access_token,
                }),
            }
        );

        const json = await res.json();

        if (json.status === "success") {
            localStorage.setItem("jwt", json.token);
        } else {
            setErrorElement(
                <>
                    User didn't sign up with this gmail account!{" "}
                    <Button variation="link" type="button" onClick={goToSignUp}>
                        Sign up
                    </Button>{" "}
                    instead please!
                </>
            );
        }
    }

    async function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const res = await fetch(
            `${BACKEND_SERVER_ADDRESS}/api/v1/users/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }
        );

        const json = await res.json();

        if (json.status === "success") {
            localStorage.setItem("jwt", json.token);
        } else {
            setErrorElement(<>Email or password incorrect!</>);
        }
    }

    return (
        <div className="log-in-page">
            <h2 className="log-in-page__title">Log in</h2>

            <form className="log-in-page__form" onSubmit={onFormSubmit}>
                <ErrorText>{errorElement}</ErrorText>
                <FormInput
                    label="Email"
                    placeholder="Email"
                    id="email"
                    name="email"
                    type="email"
                    className="log-in-page__input"
                    required
                    validate={[
                        {
                            validator: validator.isEmail,
                            invalidMessage: "Please put in a valid email",
                        },
                    ]}
                    value={formData.email}
                    onChange={e => {
                        setErrorElement(null);
                        setFormData(data => ({
                            ...data,
                            email: e.target.value,
                        }));
                    }}
                />

                <FormInput
                    label="Password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    type="password"
                    className="log-in-page__input"
                    required
                    value={formData.password}
                    onChange={e => {
                        setErrorElement(null);
                        setFormData(data => ({
                            ...data,
                            password: e.target.value,
                        }));
                    }}
                />

                <Button
                    variation="primary"
                    type="submit"
                    className="log-in-page__submit"
                >
                    Log in
                </Button>

                <p className="log-in-page__no-account">
                    Don't have an account?&nbsp;
                    <Button variation="link" type="button" onClick={goToSignUp}>
                        Sign up
                    </Button>
                </p>
            </form>

            <SeparatorWithElement className="log-in-page__separator">
                or
            </SeparatorWithElement>

            <Button
                className="log-in-page__google-log-in-button"
                onClick={() => login()}
                variation="secondary"
            >
                <i className="bi bi-google" />
                <p>Log in with Google</p>
            </Button>
        </div>
    );
}
