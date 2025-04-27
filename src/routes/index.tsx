import { Navigate, Route, Routes } from "react-router";
import SignIn from "../pages/auth/SignIn";
import { AuthProvider } from "../context/AuthContext";
import DashboardPage from "../pages/dashboard";
import { ThemeProvider } from "../context/themeContext";
// import { useAuth } from "../hooks/useAuth";
import ProtectedRoute from "./protectedRouotes";

const AppRoutes = () => {
    const themeKey = "default";
    // const themeKey = state?.tenant?.theme || "default";
    
    return (
        <AuthProvider>
            <ThemeProvider currentTheme={themeKey}>
                <Routes>
                    <Route path="/" element={<Navigate to={'/login'} replace={true} />} />
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    } />
                </Routes>
            </ThemeProvider>
        </AuthProvider>
    )
}

export default AppRoutes;