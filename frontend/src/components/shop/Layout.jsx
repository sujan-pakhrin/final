import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
    return (
        <div className="flex flex-col bg-white overflow-hidden">

            <Header />
            <main className="flex flex-col w-full">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;