import React, { useReducer } from "react";

type ReducerFunction<State, Action> = (state: State, action: Action) => State;

type TransformActions<Actions> = {
    [K in keyof Actions]: Actions[K] extends (
        dispatch: infer _D
    ) => (...args: infer A) => infer R
        ? (...args: A) => R
        : never;
};

type ActionsObject<Action> = Record<
    string,
    (dispatch: React.Dispatch<Action>) => (...payload: unknown[]) => void
>;

type ContextType<
    State,
    Action,
    Actions extends ActionsObject<Action>
> = TransformActions<Actions> & { state: State };

export default function createDataContext<
    State,
    Action,
    Actions extends ActionsObject<Action>
>(
    reducer: ReducerFunction<State, Action>,
    actions: Actions,
    initialState: State
) {
    const Context = React.createContext<ContextType<State, Action, Actions>>({
        state: initialState,
    } as ContextType<State, Action, Actions>);

    function Provider({ children }: { children: React.ReactNode }) {
        const [state, dispatch] = useReducer(reducer, initialState);

        const boundActions = {} as TransformActions<Actions>;

        for (const key in actions) {
            boundActions[key] = actions[key](dispatch) as Actions[Extract<
                keyof Actions,
                string
            >] extends (dispatch: infer _D) => (...args: infer A) => infer R
                ? (...args: A) => R
                : never;
        }

        return (
            <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>
        );
    }

    return { Context, Provider };
}
