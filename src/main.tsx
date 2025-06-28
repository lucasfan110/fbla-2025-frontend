import { GoogleOAuthProvider } from "@react-oauth/google";
import mapboxgl from "mapbox-gl";
import { createRoot } from "react-dom/client";
import Modal from "react-modal";
import {
    createHashRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import { UserAuthProvider } from "./contexts/UserAuthContext.ts";
import { UserAuthFormProvider } from "./contexts/UserAuthFormContext.ts";
import "./index.scss";
import AppLayout from "./layouts/AppLayout.tsx";
import ContainerLayout from "./layouts/ContainerLayout.tsx";
import WithEditPostingWindow from "./layouts/WithEditPostingWindow.tsx";
import DashboardPage from "./pages/DashboardPage/index.tsx";
import FinishSignUpPage from "./pages/FinishSignUpPage.tsx";
import IndexPage from "./pages/IndexPage.tsx";
import LogoutPage from "./pages/LogOutPage.tsx";
import MyApplicationsPage from "./pages/MyApplicationsPage.tsx";
import PostingApplicationsPage from "./pages/PostingApplicationsPage.tsx";
import PostingDetailsPage from "./pages/PostingDetailsPage.tsx";
import StudentManagementPage from "./pages/StudentManagementPage.tsx";
import ValidateUser from "./pages/ValidateUser.tsx";
import AdminAnalysisPage from "./pages/AdminAnalysisPage.tsx";

mapboxgl.accessToken =
    "pk.eyJ1IjoibHVjYXNmYW4iLCJhIjoiY203bGlzeDBjMGJyeDJrcHRzOWFtMmVrciJ9.ispn4TNP3afN0jFC4npUEg";

Modal.setAppElement("#root");

const router = createHashRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<IndexPage />} />
                <Route element={<ContainerLayout />}>
                    <Route
                        path="/dashboard"
                        element={<WithEditPostingWindow />}
                    >
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
                ></Route>

                <Route
                    path="/admin"
                    element={<ValidateUser userRole="admin" />}
                >
                    <Route element={<ContainerLayout />}>
                        <Route
                            path="student-management"
                            element={<StudentManagementPage />}
                        />
                        <Route
                            path="analysis"
                            element={<AdminAnalysisPage />}
                        />
                    </Route>
                </Route>
            </Route>

            <Route path="/finish-sign-up" element={<FinishSignUpPage />} />
            <Route path="/log-out" element={<LogoutPage />} />
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
