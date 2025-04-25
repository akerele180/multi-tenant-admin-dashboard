import { Route, Routes } from "react-router";
import SignIn from "../pages/auth/SignIn";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
        </Routes>
    )
}

export default AppRoutes;