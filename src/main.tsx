import { createRoot } from "react-dom/client";
import {
    createHashRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import "./index.scss";
import AppLayout from "./Layouts/AppLayout.tsx";
import IndexPage from "./Pages/IndexPage.tsx";
import ContainerLayout from "./Layouts/ContainerLayout.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const router = createHashRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<IndexPage />} />
                <Route element={<ContainerLayout />}></Route>
            </Route>
        </>
    )
);

createRoot(document.getElementById("root")!).render(
    <GoogleOAuthProvider clientId="787597170145-sukbvh7o7pj8bkeru9mego4ub3n9e86t.apps.googleusercontent.com">
        <RouterProvider router={router} />
    </GoogleOAuthProvider>
);
