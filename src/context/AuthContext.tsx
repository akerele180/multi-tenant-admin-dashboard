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
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    if (state.token && state.expiresAt) {
      const timeout = setTimeout(() => {
        dispatch({ type: "LOGOUT" });
      }, state.expiresAt - Date.now());

      return () => clearTimeout(timeout);
    }
  }, [state.token, state.expiresAt]);

  // Load user from storage
  useEffect(() => {
    const data = getAuthFromStorage();
    if (data && Date.now() < data.expiresAt) {
      dispatch({ type: "LOGIN", payload: { ...data, loading: false } });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;