import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "../layout";
import { TasksPages } from "@/pages/tasks";
import NotesPage from "@/pages/notes";

export default function AppRouter() {
    const routes = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '/tasks',
                    element: <TasksPages />
                },
                {
                    path: '/notes',
                    element: <NotesPage />
                }
            ]
        }
    ]);

    return <RouterProvider router={routes} />
}