import createDataContext from "./createDataContext";

type Action =
    | { type: "open_log_in_modal" }
    | { type: "open_sign_up_modal" }
    | { type: "close_modal" };
export type ActiveModal = "logIn" | "signUp" | "none";

type State = {
    activeModal: ActiveModal;
};

function userAuthFormReducer(state: State, action: Action): State {
    switch (action.type) {
        case "open_log_in_modal":
            return { activeModal: "logIn" };
        case "open_sign_up_modal":
            return { activeModal: "signUp" };
        case "close_modal":
            return { activeModal: "none" };
        default:
            break;
    }

    return state;
}

function openLogInModal(dispatch: React.Dispatch<Action>) {
    return () => {
        dispatch({ type: "open_log_in_modal" });
    };
}

function openSignUpModal(dispatch: React.Dispatch<Action>) {
    return () => {
        dispatch({ type: "open_sign_up_modal" });
    };
}

function closeModal(dispatch: React.Dispatch<Action>) {
    return () => {
        dispatch({ type: "close_modal" });
    };
}

export const { Context: UserAuthFormContext, Provider: UserAuthFormProvider } =
    createDataContext(
        userAuthFormReducer,
        { openLogInModal, openSignUpModal, closeModal },
        { activeModal: "none" }
    );
