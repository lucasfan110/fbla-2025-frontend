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

const router = createHashRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<IndexPage />} />
                <Route element={<ContainerLayout />}></Route>
            </Route>

            <Route path="/finish-sign-up" element={<FinishSignUpPage />} />
        </>
    )
);

createRoot(document.getElementById("root")!).render(
    <GoogleOAuthProvider clientId="787597170145-sukbvh7o7pj8bkeru9mego4ub3n9e86t.apps.googleusercontent.com">
        <RouterProvider router={router} />
    </GoogleOAuthProvider>
);
