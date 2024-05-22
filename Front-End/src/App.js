import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { useState } from "react";
import Footer from "./components/Footer/Footer";
import ErrorPage from "./pages/ErrorPage";
import ClienteList from "./components/GovEmployee/ClienteList/ClienteList";
import ClienteDetails from "./components/GovEmployee/ClienteDetails/ClienteDetails";
import AddCliente from "./components/GovEmployee/AddCliente/AddCliente";
import EditCliente from "./components/GovEmployee/EditCliente/EditCliente";

function App() {
  
  const apiURL = "http://localhost:8080";

  const [form, setForm] = useState({
    idCliente: "",
    nome: "",
    sexo: "",
    rua: "",
    vinculo: "",
    cargo: "",
    numero: "",
    cidade: "",
    email: "",
    telefone: "",
  });

  
  return (
    <div className="App bg-light" style={{ height: "100vh" }}>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
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
          element={
            <AddCliente apiURL={apiURL} form={form} setForm={setForm} />
          }
        />
        <Route
          path="/editarCliente/:idCliente"
          element={
            <EditCliente apiURL={apiURL} form={form} setForm={setForm} />
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
