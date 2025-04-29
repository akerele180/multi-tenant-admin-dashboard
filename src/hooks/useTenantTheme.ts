import { useEffect } from "react";

export const useTenantTheme = () => {
    useEffect(() => {
        const tenant = JSON.parse(localStorage.getItem("auth") || "{}");
        if (tenant.tenant?.theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);
};