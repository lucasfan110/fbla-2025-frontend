import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useContext, useState } from "react";
import Button from "../components/Button";
import ErrorText from "../components/ErrorText";
import "./SignUpPage.scss";
import { UserAuthFormContext } from "../context/UserAuthFormContext";
import useAuth from "../hooks/useAuth";
import getGoogleAccountInfo from "../util/getGoogleAccountInfo";
import backend from "../api/backend";

export default function SignUpPage() {
    const { openLogInModal, closeModal } = useContext(UserAuthFormContext);
    const [errorElement, setErrorElement] = useState<React.ReactNode>(null);
    const { logIn } = useAuth();

    const signup = useGoogleLogin({
        onSuccess: onGoogleSignUp,
        onError: () =>
            setErrorElement(
                <>Failed to sign up with Google! Please try again later!</>
            ),
    });

    async function onGoogleSignUp(response: TokenResponse) {
        const userInfo = await getGoogleAccountInfo(response.access_token);

        const res = await backend.post("/users/check-duplicate-email", {
            email: userInfo.email,
        });

        if (res.data.exists) {
            console.log("exists!");
            setErrorElement(
                <>
                    User with that email already exists!{" "}
                    <Button variation="link" onClick={openLogInModal}>
                        Log in
                    </Button>{" "}
                    instead!
                </>
            );
            return;
        }

        const popupWidth = 400;
        const popupHeight = 600;

        const left = (window.innerWidth - popupWidth) / 2 + window.screenX;
        const top = (window.innerHeight - popupHeight) / 2 + window.screenY;

        const queryString = new URLSearchParams({
            accessToken: response.access_token,
        }).toString();

        const popup = window.open(
            `/fbla-2025-frontend/#/finish-sign-up?${queryString}`,
            "SignUpPopup",
            `width=${popupWidth},height=${popupHeight},top=${top},left=${left}`
        );

        if (!popup) {
            alert("Popup blocked! Please allow popups for this website.");
            return;
        }

        window.addEventListener("message", onWindowMessage);
    }

    function onWindowMessage(
        event: MessageEvent<{ type: string; payload: string }>
    ) {
        if (event.origin !== window.location.origin) {
            console.warn("Untrusted message origin!");
            return;
        }

        if (!event.data) {
            return;
        }

        const { payload } = event.data;

        switch (event.data.type) {
            case "SIGNUP_FORM_SUCCESS":
                localStorage.setItem("jwt", payload);
                onSignUpSuccess();
                break;
            case "SIGNUP_FORM_ERROR":
                // TODO: Sign up error
                alert("Failed to sign up!");
                break;
            default:
                break;
        }
    }

    function onSignUpSuccess() {
        logIn();
        closeModal();
    }

    return (
        <div className="sign-up-page">
            <h2 className="sign-up-page__title">Sign Up</h2>

            <ErrorText>{errorElement}</ErrorText>

            <Button
                className="sign-up-page__google-sign-up-button"
                onClick={() => signup()}
                variation="secondary"
            >
                <i className="bi bi-google" />
                <p>Sign up with Google</p>
            </Button>

            <p className="sign-up-page__already-member">
                Already a member?{" "}
                <Button variation="link" type="button" onClick={openLogInModal}>
                    Log in
                </Button>
            </p>
        </div>
    );
}
