import axios from "axios";
import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../api/api.js";
import { Context } from "../context/userContext.jsx";

export const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { name, _id, rol, setId, setRol, setName } = useContext(Context);

  const login = async (data) => {
    setErrorMessage("");

    try {
      const response = await api.post("/login", data);
      const userInfo = response.data.userInfo;
      setName(userInfo.name);
      setId(userInfo._id);
      setRol(userInfo.rol);
      const recordsResponse = await api.get(`/getRecords/${userInfo._id}`);
      navigate("/home");
    } catch (error) {
      console.log(error);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="h-screen w-screen flex bg-white justify-center items-center ">
      <form
        className="h-1/3 flex flex-col w-auto justify-center items-center p-7 rounded-2xl shadow-2xl bg-gray-200"
        onSubmit={handleSubmit(login)}
      >
        <h1 className="text-3xl font-extrabold ">Time Tracker App</h1>
        <p className="text-red-500 font-bold text-xs h-7"></p>

        <div className="flex flex-col p-0 mb-">
          <label htmlFor="username" className="mx-2 text-xl ">
            Username
          </label>
          {}
          <input
            id="username"
            type="text"
            {...register("username")}
            required
            className="border border-gray-500 rounded-md mx-2 pl-2"
          />
        </div>
        <div className="flex flex-col p-0 mb-3">
          <label htmlFor="password" className="mx-2 text-xl ">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            required
            className="border border-gray-500 rounded-md mx-2 pl-2"
          />
        </div>

        <div className="h-7 justify-center items-center">
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
        </div>
        <button
          type="submit"
          className=" hover:bg-green-600 hover:text-white  font-bold p-2 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};
