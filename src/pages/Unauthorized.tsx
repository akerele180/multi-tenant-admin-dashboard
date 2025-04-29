import { Link } from "react-router";

// pages/Unauthorized.tsx
export default function Unauthorized() {

    return (
        <div className="flex justify-center items-center h-screen flex-col">
            <h1 className="text-3xl font-bold">403 - Forbidden</h1>
            <p>You don’t have permission to access this page.</p>
            <p className="pt-4 text-sm"> <Link to={'/dashboard'} className="underline cursor-pointer">Go back to dashboard</Link> or contact your admin.</p>
        </div>
    );
}
