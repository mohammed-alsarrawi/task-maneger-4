import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { auth, db } from "../firebase";
import { ref, get } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

const LoadingSpinner = ({ size = "md", color = "blue" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const colorClasses = {
    blue: "border-blue-500",
    red: "border-red-500",
    green: "border-green-500",
    purple: "border-purple-500",
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className={`
          ${sizeClasses[size]}
          border-4
          border-t-transparent
          ${colorClasses[color]}
          rounded-full
          animate-spin
        `}
        role="status"
        aria-label="loading"
      />
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Get the current route location

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload();

        // Check if the user's email is verified
        setEmailVerified(user.emailVerified);

        // Fetch the user's role from the database
        const userRef = ref(db, `users/${user.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const role = snapshot.val().role;
          console.log("User role:", role);
          setUserRole(role);
        } else {
          console.log("No role found for user:", user.uid);
        }
      } else {
        console.log("No user is logged in");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    console.log("Loading...");
    return <LoadingSpinner size="lg" color="blue" />;
  }

  console.log("User role after loading:", userRole);
  console.log("Email verified:", emailVerified);

  // Redirect if email is not verified
  if (!emailVerified) {
    console.log("Redirecting to /verify-email because email is not verified");
    return <Navigate to="/verify-email" replace />;
  }

  // Check if the user is trying to access a restricted route
  const isTasksPage = location.pathname === "/tasks";

  // If the user is a team member and trying to access the Tasks page, redirect to Dashboard
  if (userRole === "team-member" && isTasksPage) {
    console.log(
      "Redirecting to /dashboard because team members cannot access tasks"
    );
    return <Navigate to="/dashboard" replace />;
  }

  // If the user is not a manager or team member, redirect to home
  if (userRole !== "manager" && userRole !== "team-member") {
    console.log("Redirecting to / because role is not manager or team-member");
    return <Navigate to="/" replace />;
  }

  // Allow access to the requested route
  return children;
};

export default ProtectedRoute;
