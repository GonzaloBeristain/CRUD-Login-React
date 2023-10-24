import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, Typography, CardContent, TextField, Button } from "@mui/material";
import "./css/Login.css";

export const Login = () => {
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setLogin({
            ...login,
            [name]: value,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestOptions = {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(login),
            };

            let response = await fetch("http://localhost:3000/api/v1/usuarios/login", requestOptions)
            let data = await response.json();

            if(data.code == 200) {
                alert(data.message);
                localStorage.setItem("token", data.token)
                localStorage.setItem("usuario", JSON.stringify(data.usuario));
                let token = localStorage.getItem("token");
                window.location.href = `/perfil?token=${token}`
            }else {
                alert(data.message);
            };
        } catch (error) {
            alert("Error al realizar un login de usuario.")
        }
    };

    return (
        <Grid container alignItems="center" justifyContent="center" direction="column" >
            <Grid item xs={3}>
                <Card className="card" sx={{ mt: 5 }}>
                    <Typography className="titulo" variant="h5" textAlign="center" fontWeight="bold" fontSize="27px">
                        INICIAR SESIÓN
                    </Typography>
                    <CardContent >
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <TextField variant="filled" label="Ingrese su Email" sx={{ display: "block", margin: "10px 0" }} name="email" onChange={handleChange} />
                            <TextField variant="filled" label="Ingrese su Password" sx={{ display: "block", margin: "10px 0" }} name="password" onChange={handleChange} />
                            <Button className="botonAdd" variant="contained" color="primary" type="submit" >Ingresar</Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
};