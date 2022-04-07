import axios from "axios";
import React, { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";
import { ACTION_TYPE } from "../utils";
import { useDataProvider } from "./data-context";

export const AuthContext = createContext();
export const useAuthProvider = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const localStorageToken = JSON.parse(localStorage.getItem("login"));
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(localStorageUser?.user);
  const [token, setToken] = useState(localStorageToken?.token);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useDataProvider();

  const login = async (
    email = "saurabhsuthar@gmail.com",
    password = "qwerty1234"
  ) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const {
          data: { foundUser, encodedToken },
        } = response;
        setToken(encodedToken);
        setUser(foundUser);
        localStorage.setItem("login", JSON.stringify({ token: encodedToken }));
        localStorage.setItem("user", JSON.stringify({ user: foundUser }));
        setLoading(false);
        dispatch({
          type: ACTION_TYPE.ACTIVATE_ALERT,
          payload: { message: "Log In successful", color: "green" },
        });
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      dispatch({
        type: ACTION_TYPE.ACTIVATE_ALERT,
        payload: { message: "Something went wrong, try again", color: "red" },
      });
    }
  };

  const signup = async (email, password, firstName, lastName) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/signup", {
        email,
        password,
        firstName,
        lastName,
      });
      if (response.status === 201) {
        const {
          data: { createdUser, encodedToken },
        } = response;
        localStorage.setItem("login", JSON.stringify({ token: encodedToken }));
        setToken(encodedToken);
        localStorage.setItem("user", JSON.stringify({ user: createdUser }));
        setUser(createdUser);
        setLoading(false);
        dispatch({
          type: ACTION_TYPE.ACTIVATE_ALERT,
          payload: { message: "Sign Up successful", color: "green" },
        });
      }
    } catch (error) {
      console.log("Error in login user", error);
    }
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    dispatch({
      type: ACTION_TYPE.ACTIVATE_ALERT,
      payload: { message: "Log Out successful", color: "green" },
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, loading, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};
