import { createRoot } from "react-dom/client";
import {
    createHashRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import "./index.scss";
import AppLayout from "./layouts/AppLayout.tsx";
import IndexPage from "./pages/IndexPage.tsx";
import ContainerLayout from "./layouts/ContainerLayout.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import FinishSignUpPage from "./pages/FinishSignUpPage.tsx";
import { UserAuthFormProvider } from "./context/UserAuthFormContext.ts";
import DashboardPage from "./pages/DashboardPage/index.tsx";
import { UserAuthProvider } from "./context/UserAuthContext.ts";
import NewPostingPage from "./pages/NewPostingPage.tsx";
import ValidateUserRole from "./pages/ValidateUserRole.tsx";

const router = createHashRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<IndexPage />} />
                <Route element={<ContainerLayout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Route>

                <Route
                    path="/employer"
                    element={<ValidateUserRole userRole="employer" />}
                >
                    <Route element={<ContainerLayout />}>
                        <Route
                            path="new-posting"
                            element={<NewPostingPage />}
                        />
                    </Route>
                </Route>
            </Route>

            <Route path="/finish-sign-up" element={<FinishSignUpPage />} />
        </>
    )
);

createRoot(document.getElementById("root")!).render(
    <GoogleOAuthProvider clientId="787597170145-sukbvh7o7pj8bkeru9mego4ub3n9e86t.apps.googleusercontent.com">
        <UserAuthFormProvider>
            <UserAuthProvider>
                <RouterProvider router={router} />
            </UserAuthProvider>
        </UserAuthFormProvider>
    </GoogleOAuthProvider>
);
