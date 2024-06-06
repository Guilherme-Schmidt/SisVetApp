import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Importar componentes
import ErrorPage from "./pages/ErrorPage";
import ClienteList from "./components/GovEmployee/ClienteList/ClienteList";
import ClienteDetails from "./components/GovEmployee/ClienteDetails/ClienteDetails";
import AddCliente from "./components/GovEmployee/AddCliente/AddCliente";
import EditCliente from "./components/GovEmployee/EditCliente/EditCliente";
import AnimalList from "./components/Animal/AnimalList/AnimalList";
import AddAnimal from "./components/Animal/AddAnimal/AddAnimal";
import AnimalDetails from "./components/Animal/AnimalDetails/AnimalDetails";
import EditAnimal from "./components/Animal/EditAnimal/EditAnimal";
import Login from "./Login";
import ProfilePage from "./components/userspage/ProfilePage";
import UserManagementPage from "./components/userspage/UserManagementPage";

function App() {
  const apiURL = "http://localhost:8080";

  // Estado para o formulário
  const [form, setForm] = useState({
    idCliente: "",
    nome: "",
    sexo: "",
    rua: "",
    numero: "",
    cidade: "",
    email: "",
    telefone: "",
    raca: "",
    especie: "",
    cor: "",
    proprietario: "",
    foto: "",
    senha: "",
  });

  return (
    <Routes>
      {/* Rotas para os diferentes componentes */}
      <Route path="/profilePage" element={<ProfilePage apiURL={apiURL} form={form} setForm={setForm} />} />
      <Route path="/userManagement" element={<UserManagementPage apiURL={apiURL} form={form} setForm={setForm} />} />
      <Route path="/" element={<Login apiURL={apiURL} form={form} setForm={setForm} />} />

      {/* Rotas para os clientes */}
      <Route path="/listarClientes" element={<ClienteList apiURL={apiURL} />} />
      <Route path="/listarCliente/:idCliente" element={<ClienteDetails apiURL={apiURL} />} />
      <Route path="/cadastrarCliente" element={<AddCliente apiURL={apiURL} form={form} setForm={setForm} />} />
      <Route path="/editarCliente/:idCliente" element={<EditCliente apiURL={apiURL} form={form} setForm={setForm} />} />

      {/* Rotas para os animais */}
      <Route path="/listarAnimais" element={<AnimalList apiURL={apiURL} form={form} setForm={setForm} />} />
      <Route path="/cadastrarAnimal" element={<AddAnimal apiURL={apiURL} form={form} setForm={setForm} />} />
      <Route path="/listarAnimal/:idAnimal" element={<AnimalDetails apiURL={apiURL} form={form} setForm={setForm} />} />
      <Route path="/editarAnimal/:idAnimal" element={<EditAnimal apiURL={apiURL} form={form} setForm={setForm} />} />

      {/* Rota de erro */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
