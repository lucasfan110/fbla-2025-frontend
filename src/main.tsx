import { GoogleOAuthProvider } from "@react-oauth/google";
import mapboxgl from "mapbox-gl";
import { createRoot } from "react-dom/client";
import {
    createHashRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import { UserAuthProvider } from "./context/UserAuthContext.ts";
import { UserAuthFormProvider } from "./context/UserAuthFormContext.ts";
import "./index.scss";
import AppLayout from "./layouts/AppLayout.tsx";
import ContainerLayout from "./layouts/ContainerLayout.tsx";
import DashboardPage from "./pages/DashboardPage/index.tsx";
import FinishSignUpPage from "./pages/FinishSignUpPage.tsx";
import IndexPage from "./pages/IndexPage.tsx";
import MyApplicationsPage from "./pages/MyApplicationsPage.tsx";
import NewPostingPage from "./pages/NewPostingPage.tsx";
import PostingDetailsPage from "./pages/PostingDetailsPage.tsx";
import ValidateUser from "./pages/ValidateUser.tsx";
import PostingApplicationsPage from "./pages/PostingApplicationsPage.tsx";

mapboxgl.accessToken =
    "pk.eyJ1IjoibHVjYXNmYW4iLCJhIjoiY203bGlzeDBjMGJyeDJrcHRzOWFtMmVrciJ9.ispn4TNP3afN0jFC4npUEg";

const router = createHashRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<IndexPage />} />
                <Route element={<ContainerLayout />}>
                    <Route path="/dashboard">
                        <Route index element={<DashboardPage />} />
                        <Route path="postings/:postingId">
                            <Route index element={<PostingDetailsPage />} />
                            <Route
                                path="applications"
                                element={<PostingApplicationsPage />}
                            />
                        </Route>
                    </Route>
                    <Route
                        path="/my-applications"
                        element={<ValidateUser userRole="student" />}
                    >
                        <Route index element={<MyApplicationsPage />} />
                    </Route>
                </Route>

                <Route
                    path="/employer"
                    element={<ValidateUser userRole="employer" />}
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
