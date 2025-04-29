import { Settings } from "lucide-react";
import { Routes, Route, Navigate } from "react-router";
import DashboardLayout from "../components/layouts/dashboardLayout";
import { AuthProvider } from "../context/AuthContext";
import SignIn from "../pages/auth/SignIn";
import Dashboard from "../pages/dashboard";
import Subscriptions from "../pages/subscriptions";
import Transactions from "../pages/transactions";
import UserManagement from "../pages/userManagement";
import ProtectedRoute from "./protectedRoutes";


const AppRoutes = () => {

    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Navigate to={'/login'} replace={true} />} />
                <Route path="/login" element={<SignIn />} />
                <Route element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/subscriptions" element={<Subscriptions />} />
                    <Route path="/user-management" element={<UserManagement />} />
                </Route>
            </Routes>
        </AuthProvider>
    )
}

export default AppRoutes;