import api from "../api";

// Login
export const login = async (credentials) => {
  const { data } = await api.post(
    "/auth/login/",
    credentials
  );

  localStorage.setItem("access", data.access);
  localStorage.setItem("refresh", data.refresh);

  return data;
};

export const register = async (userData) => {
  const { data } = await api.post(
    "/auth/register/",
    userData
  );

  return data;
};

// Logout
export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

// Get Current User
export const me = () => {
  return api.get("/auth/me/");
};