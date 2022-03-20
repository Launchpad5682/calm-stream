import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../../context/auth-context";

export function LoginContainer() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login, token } = useAuthProvider();
  const navigate = useNavigate();

  const loginHandler = (event) => {
    event.preventDefault();
    login(form.email, form.password);
  };

  useEffect(() => {
    if (token) {
      navigate("/videos");
    }
  }, [token]);

  const changeHandler = (event) => {
    const type = event.target.type;
    if (type === "email") {
      setForm((prev) => ({ ...prev, email: event.target.value }));
    }
    setForm((prev) => ({ ...prev, password: event.target.password }));
  };
  return { form, loginHandler, changeHandler };
}