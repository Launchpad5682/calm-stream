import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../../context/auth-context";

export function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const { signup, loading, token } = useAuthProvider();
  const navigate = useNavigate();

  const signupHandler = (event) => {
    event.preventDefault();
    console.log(form);
    const { email, password, firstName, lastName } = form;
    signup(email, password, firstName, lastName);
    setForm({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    });
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const changeHandler = (event) => {
    const id = event.target.id;
    if (id === "email") {
      setForm((prev) => ({ ...prev, email: event.target.value }));
    } else if (id === "password") {
      setForm((prev) => ({ ...prev, password: event.target.value }));
    } else if (id === "firstName") {
      setForm((prev) => ({ ...prev, firstName: event.target.value }));
    } else if (id === "lastName") {
      setForm((prev) => ({ ...prev, lastName: event.target.value }));
    }
  };

  return (
    <main className="main__form--section">
      <div className="form--container">
        <div className="h6__typography typogrpahy--white bold--typography center__typography">
          Signup
        </div>
        <form onSubmit={signupHandler} className="form">
          <div className="inputbox__container">
            <input
              id="firstName"
              type="text"
              autoComplete="off"
              className="input--white"
              required
              value={form.firstName}
              onChange={changeHandler}
            />
            <label className="inputbox__label--name label__name--white inputbox__label--green">
              <span className="inputbox__label--content">First Name</span>
            </label>
          </div>
          <div className="inputbox__container">
            <input
              id="lastName"
              type="text"
              autoComplete="off"
              className="input--white"
              required
              value={form.lastName}
              onChange={changeHandler}
            />
            <label className="inputbox__label--name label__name--white inputbox__label--green">
              <span className="inputbox__label--content">Last Name</span>
            </label>
          </div>
          <div className="inputbox__container">
            <input
              id="email"
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
              id="password"
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
          <button
            className="button--sm button__solid button--green button__rounded--md fullwidth-btn bold--typography"
            type="submit"
            disabled={loading}
          >
            <span className="subtitle1__typography typography--white bold--typography">
              {loading ? "Signing Up...." : "Sign Up"}
            </span>
          </button>
          <button
            className="button--sm button__outline button__outline--green button__rounded--sm button__icon button__icon fullwidth-btn bold--typography"
            onClick={() => navigate("/login")}
          >
            <span className="subtitle1__typography typography--green">
              Already have an account
            </span>
            <span className="fa fa-arrow-right icon__typography typography--green"></span>
          </button>
        </form>
      </div>
    </main>
  );
}
