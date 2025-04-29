export const saveAuthToStorage = (data: any) => {
  localStorage.setItem("auth", JSON.stringify(data));
};

export const getAuthFromStorage = () => {
  const auth = localStorage.getItem("auth");
  if (!auth) return null;

  try {
    const parsed = JSON.parse(auth);
    if (!parsed.token || Date.now() > parsed.expiresAt) return null;
    return parsed;
  } catch {
    return null;
  }
};

export const clearAuthStorage = () => {
  localStorage.removeItem("auth");
};
