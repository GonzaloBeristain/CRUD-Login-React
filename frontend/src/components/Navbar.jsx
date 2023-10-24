import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Box, Container, Toolbar, Typography, Button } from "@mui/material";
import "./css/Navbar.css";

export const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const token = localStorage.getItem("token");

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        setIsLoggedIn(false)
        window.location.href = `/`
    }

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <Box sx={{ flexGrow: 1, pt: 8 }}>
            <AppBar  position="fixed" className="appBar" >
                <Container >
                    <Toolbar>
                        <Typography variant="h5"  sx={{ flexGrow: 1 }}>
                            <NavLink to="/" className="link"  exact="true" activeclassname="active">HOME</NavLink>
                        </Typography>

                        <Typography variant="h5" sx={{ flexGrow: 1 }}>
                            <NavLink to="/lista" className="link" activeclassname="active">PAÍSES</NavLink>
                        </Typography>

                        <Typography variant="h5" sx={{ flexGrow: 1, display: isLoggedIn ? "none" : "block" }}>
                            <NavLink to="/login" className="link" activeclassname="active">LOGIN</NavLink>
                        </Typography>

                        <Typography variant="h5" sx={{ flexGrow: 1, display: isLoggedIn ? "none" : "block" }}>
                            <NavLink to="/registro" className="link" activeclassname="active">REGISTRAR</NavLink>
                        </Typography>

                        <Typography variant="h5" sx={{ flexGrow: 1, display: isLoggedIn ? "block" : "none" }}>
                            <NavLink to={`/perfil?token=${token}`} className="link" activeclassname="active">PERFIL</NavLink>
                        </Typography>

                        <Typography variant="h5" sx={{ flexGrow: 1, display: isLoggedIn ? "block" : "none" }}>
                            <NavLink to="/logout" className="link" activeclassname="active" onClick={handleLogout}>LOGOUT</NavLink>
                        </Typography>

                        <Button className="boton" variant="contained" color="primary" onClick={() => navigate("/lista/new")} >
                            AGREGAR PAÍS
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
};