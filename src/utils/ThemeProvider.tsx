import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const { state } = useAuth();

   
    return <>
        {children}
    </>
}

export default ThemeProvider;