import React, { useEffect } from "react";
import { GetCurrentUser } from "../calls/users";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // random checks
  const getValidUser = async () => {
    try {
      const response = await GetCurrentUser();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, []);

  return <div>{children}</div>;
}

export default ProtectedRoute;
