import React, { useEffect , useState } from "react";
import { GetCurrentUser } from "../calls/users";
import { useNavigate } from "react-router-dom";
import {message} from 'antd'
import { useDispatch  , useSelector} from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";

function ProtectedRoute({ children }) {
   
   const [user , setUser] = useState(null)
   const dispatch = useDispatch()

  // random checks
  const getValidUser = async () => {
    try {
      dispatch(showLoading())
      const response = await GetCurrentUser();
      console.log(response);
      setUser(response.data)
      dispatch(hideLoading())
    // Hide Loader
    } catch (error) {
      setUser(null)
      message.error(error.message);
     
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

  return <div> {user && user.name}</div>;
}

export default ProtectedRoute;
