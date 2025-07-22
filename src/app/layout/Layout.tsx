import { Sidebar } from "@/shared"
import { Outlet } from "react-router"

export default function Layout() {
    return (
        <main className="layout">
            <Sidebar />
            <section className="layout-children">
                <Outlet />
            </section>
        </main>
    )
}