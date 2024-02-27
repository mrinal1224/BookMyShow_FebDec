import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../calls/users";
import { useNavigate } from "react-router-dom";
import { message, Layout , Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { Header } from "antd/es/layout/layout";
import {HomeOutlined , LogoutOutlined, ProfileOutlined, UserOutlined} from "@ant-design/icons"
import {Link} from "react-router-dom"

function ProtectedRoute({ children }) {

  const navItems = [
    {
      label : "Home",
      icon : <HomeOutlined />
    },

    {
      label : "Profile",
      icon : <UserOutlined />,
      children: [
        {
          label : "My Profile",
          icon : <ProfileOutlined/>
        },

        {
          label : <Link to='/login' onClick={(()=> {localStorage.removeItem('token')})}>Log Out</Link>,
          icon : <LogoutOutlined/>
        }
           
      ]
    },

]

  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  // random checks
  const getValidUser = async () => {
    try {
      dispatch(showLoading());
      const response = await GetCurrentUser();
      console.log(response);
      setUser(response.data);
      dispatch(hideLoading());
      // Hide Loader
    } catch (error) {
      setUser(null);
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

  return (
    <>
      <Layout>
        <Header
          className="d-flex justify-content-between"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>Book My Show</h3>
          <Menu theme='dark' mode='horizontal' items={navItems}/>

        </Header>
      </Layout>
    </>
  );
}

export default ProtectedRoute;
