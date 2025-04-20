import backend from "../api/backend";
import User from "../types/User";
import createDataContext from "./createDataContext";

type Action = { type: "set_user"; payload: User | null };

type State = {
    user: User | null;
};

function userAuthReducer(state: State, action: Action): State {
    switch (action.type) {
        case "set_user":
            return { user: action.payload };
        default:
            break;
    }

    return state;
}

function logIn(dispatch: React.Dispatch<Action>) {
    return async (onError?: () => void) => {
        const jwt = localStorage.getItem("jwt");

        if (!jwt) {
            onError?.();
            return;
        }

        try {
            const res = await backend.get("/users/get-user-from-token", {
                headers: { Authorization: `Bearer ${jwt}` },
            });

            if (res.data.status === "success") {
                dispatch({ type: "set_user", payload: res.data.user });
            } else {
                onError?.();
            }
        } catch {
            onError?.();
        }
    };
}

function logOut(dispatch: React.Dispatch<Action>) {
    return () => {
        localStorage.removeItem("jwt");
        dispatch({ type: "set_user", payload: null });
    };
}

export const { Context: UserAuthContext, Provider: UserAuthProvider } =
    createDataContext(
        userAuthReducer,
        {
            logIn,
            logOut,
        },
        {
            user: null,
        }
    );
