import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthProvider } from "../../context/auth-context";

export function useLogin() {
  const [form, setForm] = useState({
    email: "saurabhsuthar@gmail.com",
    password: "qwerty1234",
  });

  const { login, token, loading } = useAuthProvider();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const loginHandler = (event) => {
    event.preventDefault();
    login(form.email, form.password);
  };

  useEffect(() => {
    if (token) {
      navigate(from);
    }
  }, [navigate, token, from]);

  const changeHandler = (event) => {
    const type = event.target.type;
    if (type === "email") {
      setForm((prev) => ({ ...prev, email: event.target.value }));
    }
    setForm((prev) => ({ ...prev, password: event.target.password }));
  };
  return { form, loginHandler, changeHandler, loading };
}
