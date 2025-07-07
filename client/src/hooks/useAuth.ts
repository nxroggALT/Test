import { useState, useEffect } from "react";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const sessionId = localStorage.getItem("adminSessionId");
      const expiresAt = localStorage.getItem("adminSessionExpires");
      
      if (!sessionId || !expiresAt) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      const expireDate = new Date(expiresAt);
      const now = new Date();
      
      if (now >= expireDate) {
        // Session expired
        localStorage.removeItem("adminSessionId");
        localStorage.removeItem("adminSessionExpires");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem("adminSessionId");
    localStorage.removeItem("adminSessionExpires");
    setIsAuthenticated(false);
  };

  const getAuthHeader = () => {
    const sessionId = localStorage.getItem("adminSessionId");
    return sessionId ? `Bearer ${sessionId}` : null;
  };

  return {
    isAuthenticated,
    isLoading,
    logout,
    getAuthHeader,
  };
}