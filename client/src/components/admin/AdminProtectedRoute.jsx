import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import appContext from "../../context/AppContext";

export default function AdminProtectedRoute({ children }) {
  const { isAdminAuthenticated, setIsAdminAuthenticated } = useContext(appContext);
  const [loading, setLoading] = useState(true); // Track if authentication is being checked

  useEffect(() => {
    const token = localStorage.getItem("admintoken"); // Get the token (admintoken)

    // If token exists, mark the admin as authenticated
    if (token) {
      setIsAdminAuthenticated(true);
    } else {
      setIsAdminAuthenticated(false);
    }
    setLoading(false); // Set loading to false after checking
  }, [setIsAdminAuthenticated]); // Re-run only when setIsAdminAuthenticated changes

  // If we're still checking authentication, don't render anything yet
  if (loading) {
    return <div>Loading...</div>; // Or you can return a loading spinner here
  }

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children; // Render the protected component
}
