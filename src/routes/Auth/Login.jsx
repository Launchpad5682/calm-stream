import React from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import { useLogin } from "./useLogin";

export function Login() {
  const { form, loading, loginHandler, changeHandler } = useLogin();

  return (
    <main className="main__form--section">
      <div className="form--container">
        <div className="h6__typography typogrpahy--black bold--typography center__typography">
          Login
        </div>
        <form onSubmit={loginHandler} className="form">
          <div className="inputbox__container">
            <input
              type="email"
              autoComplete="off"
              className="input--white"
              required
              value={form.email}
              onChange={changeHandler}
            />
            <label className="inputbox__label--name label__name--white inputbox__label--green">
              <span className="inputbox__label--content">Email</span>
            </label>
          </div>
          <div className="inputbox__container">
            <input
              type="password"
              autoComplete="off"
              className="input--white"
              required
              value={form.password}
              onChange={changeHandler}
            />
            <label className="inputbox__label--name label__name--white inputbox__label--green">
              <span className="inputbox__label--content">Password</span>
            </label>
          </div>
          <div className="row--between">
            <div className="input--check">
              <input type="checkbox" name="" id="remember-me" />
              <label className="subtitle1__typography" htmlFor="rememeber-me">
                Remember me
              </label>
            </div>
            <Link
              className="forgot--link subtitle1__typography bold--typography"
              to="/forgot-password"
            >
              Forgot Password
            </Link>
          </div>
          <button
            className="button--sm button__solid button--green button__rounded--md fullwidth-btn bold--typography"
            type="submit"
            disabled={loading}
          >
            <span className="subtitle1__typography typography--white bold--typography">
              {loading ? "Logging in...." : "Login"}
            </span>
          </button>
          <button className="button--sm button__outline button__outline--green button__rounded--sm button__icon button__icon fullwidth-btn bold--typography">
            <span className="subtitle1__typography typography--green">
              Create an account
            </span>
            <span className="fa fa-arrow-right icon__typography typography--green"></span>
          </button>
        </form>
      </div>
    </main>
  );
}
