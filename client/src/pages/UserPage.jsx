import { useContext, useEffect, useState } from "react";
import { Context } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export const UserPage = () => {
  const navigate = useNavigate();
  const { name, _id, setName, setRol, setId } = useContext(Context);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const getRecords = async () => {
      try {
        const response = await api.get(`/getRecords/${_id}`);
        setRecords(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getRecords();
  });

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

  const newRegister = async () => {
    try {
      await api.post(`createRecord/${_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewRecord = (e) => {
    e.preventDefault();
    newRegister();
  };

  return (
    <div className="flex">
      <aside className="flex-1 flex-col  h-screen justify-center items-center">
        <h1>Tus ingresos</h1>
        <div>
          {records.length > 0 ? (
            records.map((record) => (
              <div className="w-full bg-blue-600 flex flex-col p-2 mb-2 text-white">
                <p>Fecha: {record.date}</p>
                <p>Hora: {record.time}</p>
              </div>
            ))
          ) : (
            <p>No hay registros disponibles.</p>
          )}
        </div>
      </aside>

      <div className="w-5/6 h-screen justify-center items-center flex">
        <form className="bg-slate-100 shadow-2xl w-1/4 h-auto justify-center items-center flex-col flex rounded-lg p-6">
          <h1 className="font-bold text-3xl mb-10">Hola de nuevo {name}</h1>
          <p className="mb-10">
            El registro de entrada es automático :), con un solo botón la app te
            ayuda a gestionar tus ingresos
          </p>
          <div className="flex items-center w-full justify-between">
            <button
              className="bg-green-600 text-white rounded-lg p-3 hover:bg-green-700"
              onClick={handleNewRecord}
            >
              Nuevo Ingreso
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white rounded-lg p-3 hover:bg-red-700"
            >
              Salir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
