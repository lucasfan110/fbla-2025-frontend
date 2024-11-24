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

const router = createHashRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<AppLayout />}>
                <Route element={<ContainerLayout />}>
                    <Route index element={<IndexPage />} />
                </Route>
            </Route>
        </>
    )
);

createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />
);
