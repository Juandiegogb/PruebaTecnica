import React, { useContext, useEffect, useState } from "react";
import api from "../api/api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Context } from '../context/userContext';


export const AdminPage = () => {
  const { name, _id, setName, setRol, setId } = useContext(Context);
  const [users, setUsers] = useState([]);
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await api.get("/getUsers");
        setUsers(response.data);
      } catch (error) {}
    };
    getUsers();
  });

  const createUser = async (data) => {
    try {
      const response = await api.post("/createUser", data);
    } catch (error) {
      setErrorMessage([error.response.data.message]);
    }
  };

  const clearContext = () => {
    setName("");
    setRol(null);
    setId("");
    navigate("/");
  };

  const handleLogout = () => {
    clearContext();
    navigate("/");
  };

  return (
    <div className="flex">
      <aside className="flex-1 flex-col  h-screen justify-center items-center">
        <h1>Usuarios</h1>
        <div>
          {users.length > 0 ? (
            users.map((user) => (
              <div className="w-full bg-blue-600 flex flex-col p-2 mb-2 text-white">
                <p>Nombre: {user.name}</p>
                <p>Username: {user.username}</p>
                <p>Rol: {user.rol}</p>
              </div>
            ))
          ) : (
            <p>No hay registros disponibles.</p>
          )}
        </div>
      </aside>

      <div className="w-5/6 h-screen justify-center items-center flex">
        <form
          className="h-2/3 flex flex-col w-auto justify-center items-center p-7 rounded-2xl shadow-2xl bg-gray-200"
          onSubmit={handleSubmit(createUser)}
        >
          <h1 className="text-3xl">Crear nuevo usuario</h1>
          <div className="flex flex-col p-0 mb-">
            <label htmlFor="nombre" className="mx-2 text-xl ">
              Nombre
            </label>
            {}
            <input
              id="nombre"
              type="text"
              {...register("name")}
              required
              className="border border-gray-500 rounded-md mx-2 pl-2"
            />
          </div>
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
          <div className="flex flex-col p-0 mb-3">
            <label htmlFor="rol" className="mx-2 text-xl ">
              Rol
            </label>
            <select {...register("rol")} id="rol">
              <option value="empleado">Empleado</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="h-7 justify-center items-center">
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white  font-bold p-2 rounded-md"
          >
            Crear
          </button>
        </form>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white rounded-lg p-3 hover:bg-red-700"
          >
            Salir
          </button>
      </div>
    </div>
  );
};
