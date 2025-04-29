import { Link, useNavigate } from "react-router";

// pages/Unauthorized.tsx
export default function Unauthorized() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-2);
    };

    return (
        <div className="flex justify-center items-center h-screen flex-col">
            <h1 className="text-3xl font-bold">403 - Forbidden</h1>
            <p>You don’t have permission to access this page.</p>
            <p className="pt-4 text-sm"> <button className="bg-gray-200 cursor-pointer" onClick={handleBack}>Go back to dashboard</button> or contact your admin.</p>
        </div>
    );
}
