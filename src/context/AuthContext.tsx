import { createContext, useReducer, useEffect, ReactNode } from "react";
import { getAuthFromStorage, clearAuthStorage } from "../utils/storage";
import { User, Tenant } from "../utils/models";

interface AuthState {
  user: User | null;
  tenant: Tenant | null;
  token: string | null;
  expiresAt: number | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  tenant: null,
  token: null,
  expiresAt: null,
  loading: false,
};

type Action =
  | { type: "LOGIN"; payload: AuthState }
  | { type: "LOGOUT" }
  | { type: "REFRESH_TOKEN"; payload: { token: string; expiresAt: number } }
  | { type: "SET_LOADING"; payload: boolean };

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => { } });

const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, ...action.payload };
    case "LOGOUT":
      clearAuthStorage();
      return { ...initialState };
    case "REFRESH_TOKEN":
      return {
        ...state,
        token: action.payload.token,
        expiresAt: action.payload.expiresAt,
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Rehydrate
  useEffect(() => {
    const data = getAuthFromStorage();
    if (data) {
      if (Date.now() < data.expiresAt) {
        dispatch({ type: "LOGIN", payload: { ...data, loading: false } });
      } else {
        dispatch({ type: "LOGOUT" });
      }
    }
  }, []);

  // Auto-refresh
  useEffect(() => {
    if (state.token && state.expiresAt) {
      const expiresIn = state.expiresAt - Date.now();

      const timeout = setTimeout(() => {
        const newToken = Math.random().toString(36);
        const newExpiresAt = Date.now() + 1000 * 60 * 60;

        const updatedPayload = {
          ...state,
          token: newToken,
          expiresAt: newExpiresAt,
        };
        localStorage.setItem("auth", JSON.stringify(updatedPayload));
        dispatch({
          type: "REFRESH_TOKEN",
          payload: { token: newToken, expiresAt: newExpiresAt },
        });
      }, expiresIn - 5000); // refresh 5s before expiry

      return () => clearTimeout(timeout);
    }
  }, [state.token, state.expiresAt]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
