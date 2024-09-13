import { useContext, useEffect, useState } from "react";
import { Context } from "../context/userContext";
import { useNavigate } from "react-router-dom";

import { UserPage } from "./UserPage";
import { AdminPage } from "./AdminPage";

export const HomePage = () => {
  const navigate = useNavigate();
  const { rol } = useContext(Context);
  useEffect(() => {
    if (!rol) {
      navigate("/");
    }
  }, [rol, navigate]);

  return rol == "admin" ? <AdminPage /> : <UserPage />;
};
