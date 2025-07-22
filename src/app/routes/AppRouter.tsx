import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "../layout";
import { TasksPages } from "@/pages/tasks";

export default function AppRouter() {
    const routes = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '/tasks',
                    element: <TasksPages />
                }
            ]
        }
    ]);

    return <RouterProvider router={routes} />
}