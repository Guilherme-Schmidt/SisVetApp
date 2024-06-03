import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { useState } from "react";
import ErrorPage from "./pages/ErrorPage";
import ClienteList from "./components/GovEmployee/ClienteList/ClienteList";
import ClienteDetails from "./components/GovEmployee/ClienteDetails/ClienteDetails";
import AddCliente from "./components/GovEmployee/AddCliente/AddCliente";
import EditCliente from "./components/GovEmployee/EditCliente/EditCliente";
import AnimalList from "./components/Animal/AnimalList/AnimalList";
import AddAnimal from "./components/Animal/AddAnimal/AddAnimal";
import AnimalDetails from "./components/Animal/AnimalDetails/AnimalDetails";
import EditAnimal from "./components/Animal/EditAnimal/EditAnimal";
import AdminList from "./components/Administradores/AdminList";
import Login from "./Login"
function App() {
  const apiURL = "http://localhost:8080";

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
    prorietario: "",
    foto: "",
    email: "",  // Adicionando emailFunc para login
    senha: "", 
  });

  return (
    <div className="App bg-light" style={{ height: "100vh" }}>
      <NavigationBar />
      <Routes>
      <Route
          path="/"
          element={<Login apiURL={apiURL} form={form} setForm={setForm} />}
        />
      <Route
          path="/administradores"
          element={<AdminList apiURL={apiURL} />}
        />
        <Route
          path="/listarClientes"
          element={<ClienteList apiURL={apiURL} />}
        />
        <Route
          path="/listarCliente/:idCliente"
          element={<ClienteDetails apiURL={apiURL} />}
        />
        <Route
          path="/cadastrarCliente"
          element={<AddCliente apiURL={apiURL} form={form} setForm={setForm} />}
        />
        <Route
          path="/editarCliente/:idCliente"
          element={
            <EditCliente apiURL={apiURL} form={form} setForm={setForm} />
          }
        />

        {/* ANIMAL */}

        <Route path="*" element={<ErrorPage />} />
        <Route
          path="/listarAnimais"
          element={<AnimalList apiURL={apiURL} form={form} setForm={setForm} />}
        />
        <Route
          path="/cadastrarAnimal"
          element={<AddAnimal apiURL={apiURL} form={form} setForm={setForm} />}
        />
        <Route
          path="/listarAnimal/:idAnimal"
          element={
            <AnimalDetails apiURL={apiURL} form={form} setForm={setForm} />
          }
        />
        <Route
          path="/editarAnimal/:idAnimal"
          element={<EditAnimal apiURL={apiURL} form={form} setForm={setForm} />}
        />

        {/* GERAL */}

        <Route />
      </Routes>
    </div>
  );
}

export default App;
