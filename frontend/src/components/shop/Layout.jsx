import { Outlet } from "react-router-dom";
import Header from "../global/Navbar";

function Layout() {
    return (
        <div className="flex flex-col bg-white overflow-hidden">
            <div className="h-16">

            <Header />
            </div>

            <main className="flex flex-col w-full">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;