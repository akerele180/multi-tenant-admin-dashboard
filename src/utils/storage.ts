export const saveAuthToStorage = (data: any) => {
    localStorage.setItem("auth", JSON.stringify(data));
  };
  
  export const getAuthFromStorage = () => {
    const auth = localStorage.getItem("auth");
    return auth ? JSON.parse(auth) : null;
  };
  
  export const clearAuthStorage = () => {
    localStorage.removeItem("auth");
  };
  