import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useContext, useReducer } from "react";
import validator from "validator";
import backend from "../api/backend";
import Button from "../components/Button";
import ErrorText from "../components/ErrorText";
import FormInput from "../components/FormInput";
import SeparatorWithElement from "../components/SeparatorWithElement";
import { UserAuthFormContext } from "../context/UserAuthFormContext";
import "./LogInPage.scss";

interface State {
    email: string;
    password: string;
    errorElement: React.ReactNode;
}

const INITIAL_STATE: State = { email: "", password: "", errorElement: null };

type Action =
    | { type: "changeEmail"; payload: string }
    | { type: "changePassword"; payload: string }
    | { type: "setError"; payload: React.ReactNode }
    | { type: "resetError" };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "changeEmail":
            return { ...state, email: action.payload };
        case "changePassword":
            return { ...state, password: action.payload };
        case "setError":
            return { ...state, errorElement: action.payload };
        case "resetError":
            return { ...state, errorElement: null };
        default:
            throw new Error("Unhandled action type");
    }
}

export default function LogInPage() {
    const { openSignUpModal } = useContext(UserAuthFormContext);
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const { email, password, errorElement } = state;

    const login = useGoogleLogin({
        onSuccess: onGoogleLogin,
        onError: () =>
            dispatch({
                type: "setError",
                payload: (
                    <>Failed to log in with Google! Please try again later!</>
                ),
            }),
    });

    async function onGoogleLogin(response: TokenResponse) {
        const res = await backend.post(
            "/users/google-auth/login",
            JSON.stringify({ token: response.access_token })
        );

        const { status, token } = res.data;

        if (status === "success") {
            localStorage.setItem("jwt", token);
            onLoginSuccess();
        } else {
            dispatch({
                type: "setError",
                payload: (
                    <>
                        User didn't sign up with this gmail account!{" "}
                        <Button
                            variation="link"
                            type="button"
                            onClick={openSignUpModal}
                        >
                            Sign up
                        </Button>{" "}
                        instead please!
                    </>
                ),
            });
        }
    }

    async function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const res = await backend.post(
            "/users/login",
            JSON.stringify({ email, password })
        );

        const { status, token } = res.data;

        if (status === "success") {
            localStorage.setItem("jwt", token);
            onLoginSuccess();
        } else {
            dispatch({
                type: "setError",
                payload: <>Email or password incorrect!</>,
            });
        }
    }

    function onLoginSuccess() {
        location.reload();
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
                    className="log-in-page__form-input"
                    required
                    validate={[
                        {
                            validator: validator.isEmail,
                            invalidMessage: "Please put in a valid email",
                        },
                    ]}
                    value={email}
                    onChange={e => {
                        dispatch({
                            type: "changeEmail",
                            payload: e.target.value,
                        });
                        dispatch({ type: "resetError" });
                    }}
                />

                <FormInput
                    label="Password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    type="password"
                    className="log-in-page__form-input"
                    required
                    value={password}
                    onChange={e => {
                        dispatch({
                            type: "changePassword",
                            payload: e.target.value,
                        });
                        dispatch({ type: "resetError" });
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
                    Don't have an account?{" "}
                    <Button
                        variation="link"
                        type="button"
                        onClick={openSignUpModal}
                    >
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
