import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

//COMPONENTES
import { ListaPaises } from "./components/ListaPaises.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { NuevoPais } from "./components/NuevoPais.jsx";
import { Home } from "./components/Home.jsx";
import { Login } from "./components/Login.jsx";
import { Registro } from "./components/Registro.jsx";
import { Perfil } from "./components/Perfil.jsx";

function App() {

  return (
    <BrowserRouter>
      <div className ="app">
        <Navbar />
        <Container className='container'>
          <Routes >
            <Route path='/' element={<Home />}/>
            <Route path='/lista' element={<ListaPaises />} />
            <Route path='/lista/new' element={<NuevoPais />} />
            <Route path='/lista/:id/edit' element={<NuevoPais />} />
            <Route path='/login' element={<Login />} />
            <Route path='/registro' element={<Registro />} />
            <Route path='/perfil' element={<Perfil />} />
          </Routes>
        </Container>
      </div>
      
    </BrowserRouter>
  )
}

export default App;