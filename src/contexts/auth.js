import { useState, createContext, useContext, useEffect } from "react";
import instance from "../services/instance";

const initialState = {
  isLoggedIn: Boolean(localStorage.getItem("token")),
  token: localStorage.getItem("token") || "",
  username: localStorage.getItem("username") || "",
};

export const LoginContext = createContext({
  login: () => null,
  logout: () => null,
  state: initialState,
});

export const LoginProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if ([403].includes(error.response.status)) {
          setState((prev) => ({
            ...prev,
            isLoggedIn: false,
            token: "",
            username: "",
          }));
        }
      }
    );
  }, [state.token]);

  const login = ({ token, username }) => {
    setState({
      username,
      token,
      isLoggedIn: true,
    });
    instance.defaults.headers.authorization = `Bearer ${token}`;

    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  };
  const logout = () => {
    setState({
      username: "",
      token: "",
      isLoggedIn: false,
    });
    localStorage.setItem("token", "");
    localStorage.setItem("username", "");
  };

  return (
    <LoginContext.Provider
      value={{
        login: login,
        logout: logout,
        state: state,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  const { state, login, logout } = useContext(LoginContext);
  return {
    username: state.username,
    isLoggedIn: state.isLoggedIn,
    login,
    logout,
  };
};
