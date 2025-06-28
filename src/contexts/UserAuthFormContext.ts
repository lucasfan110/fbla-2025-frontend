import createDataContext from "./createDataContext";

type Action =
    | { type: "open_log_in_modal" }
    | { type: "open_sign_up_modal" }
    | { type: "close_modal" }
    | { type: "start_ranking" }
    | { type: "finished_ranking" }
    | { type: "reset_ranking_state" };
export type ActiveModal = "logIn" | "signUp" | "none";
export type AIRankingState = "not-ranked" | "ranking" | "ranked";

type State = {
    activeModal: ActiveModal;
    aiRankingState: AIRankingState;
};

function userAuthFormReducer(state: State, action: Action): State {
    switch (action.type) {
        case "open_log_in_modal":
            return { ...state, activeModal: "logIn" };
        case "open_sign_up_modal":
            return { ...state, activeModal: "signUp" };
        case "close_modal":
            return { ...state, activeModal: "none" };
        case "start_ranking":
            return { ...state, aiRankingState: "ranking" };
        case "finished_ranking":
            return { ...state, aiRankingState: "ranked" };
        case "reset_ranking_state":
            return { ...state, aiRankingState: "not-ranked" };
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

function startRanking(dispatch: React.Dispatch<Action>) {
    return () => {
        dispatch({ type: "start_ranking" });
    };
}

function finishedRanking(dispatch: React.Dispatch<Action>) {
    return () => {
        dispatch({ type: "finished_ranking" });
    };
}

function resetRankingState(dispatch: React.Dispatch<Action>) {
    return () => {
        dispatch({ type: "reset_ranking_state" });
    };
}

export const { Context: UserAuthFormContext, Provider: UserAuthFormProvider } =
    createDataContext(
        userAuthFormReducer,
        {
            openLogInModal,
            openSignUpModal,
            closeModal,
            startRanking,
            finishedRanking,
            resetRankingState,
        },
        { activeModal: "none", aiRankingState: "not-ranked" }
    );
