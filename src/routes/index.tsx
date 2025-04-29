import { Routes, Route, Navigate } from "react-router";
import DashboardLayout from "../components/layouts/dashboardLayout";
import { AuthProvider } from "../context/AuthContext";
import SignIn from "../pages/auth/SignIn";
import Dashboard from "../pages/Dashboard";
import Subscriptions from "../pages/Subscriptions";
import Transactions from "../pages/Transactions";
import UserManagement from "../pages/UserManagement";
import ProtectedRoute from "./protectedRoutes";
import Unauthorized from "../pages/Unauthorized";
import Settings from "../pages/Settings";

const AppRoutes = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/subscriptions" element={<Subscriptions />} />
                    <Route
                        path="/user-management"
                        element={
                            <ProtectedRoute allowedRoles={["Admin"]}>
                                <UserManagement />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </AuthProvider>
    );
};

export default AppRoutes;
