import createDataContext from "./createDataContext";

type Action = { type: "set_posting_id"; payload: string | null };

type State = {
    postingId: string | null;
};

function editPostingWindowReducer(state: State, action: Action): State {
    switch (action.type) {
        case "set_posting_id":
            return { postingId: action.payload };
        default:
            break;
    }

    return state;
}

function openEditPostingWindow(dispatch: React.Dispatch<Action>) {
    return (postingId: string) => {
        console.log("open edit posting window", postingId);
        dispatch({ type: "set_posting_id", payload: postingId });
    };
}

function closeEditPostingWindow(dispatch: React.Dispatch<Action>) {
    return () => {
        dispatch({ type: "set_posting_id", payload: null });
    };
}

export const {
    Context: EditPostingWindowContext,
    Provider: EditPostingWindowProvider,
} = createDataContext(
    editPostingWindowReducer,
    {
        openEditPostingWindow,
        closeEditPostingWindow,
    },
    { postingId: null }
);
