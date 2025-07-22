import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "../layout";

export default function AppRouter() {
    const routes = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: []
        }
    ]);

    return <RouterProvider router={routes} />
}