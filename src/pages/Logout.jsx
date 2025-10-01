import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/auth/operations.js";

import { useNavigate } from "react-router-dom";
const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);
  if (token === null) {
    navigate("/");
  } else {
    return <div>Logging out...</div>;
  }
};

export default Logout;
