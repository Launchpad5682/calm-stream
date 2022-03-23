import { useEffect, useState } from "react";
import { useAuthProvider } from "../context/auth-context";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { token } = useAuthProvider();

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  return { isAuthenticated };
}
