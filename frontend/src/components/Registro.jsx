import { Grid, Card, Typography, CardContent, TextField, Button } from "@mui/material";
import "./css/Login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Registro = () => {
    try {
        const [registro, setRegistro] = useState({
        nombre: "",
        email: "",
        password: "",
        repassword: ""
        });

        const navigate = useNavigate();

        const [confirmacion, setConfirmacion] = useState(true);

        const handleChange = (e) => {
            const { name, value } = e.target;

            setRegistro({
            ...registro,
            [name]: value,
            })
            };

        const handleSubmit = async (e) => {
            e.preventDefault()

            if (!confirmacion) {
                return;
            }

            let response = await fetch("http://localhost:3000/api/v1/usuarios", {
            method: "POST",
            body: JSON.stringify(registro),
            headers:{"Content-Type": "application/json"}
            });

            let data = await response.json();

            if (data.code == 201){
                alert(data.message)
                navigate("/login")
            } else {
                alert(data.message)
            }
        };

        useEffect(() => {
            if (registro.password !== registro.repassword) {
                setConfirmacion(false);
            } else {
                setConfirmacion(true);
            }
        }, [registro.password, registro.repassword]);

        return (
        <Grid container alignItems="center" justifyContent="center" direction="column" >
            <Grid item xs={3}>
                <Card className="card" sx={{mt: 5}}>
                    <Typography className="titulo" variant="h5" textAlign="center" fontWeight="bold" fontSize="25px">
                        INGRESE SUS DATOS
                    </Typography>
                    <CardContent >
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <TextField variant="filled" label="Ingrese su Nombre" sx={{display: "block", margin: "10px 0"}} name="nombre" onChange={handleChange} />
                            <TextField variant="filled" label="Ingrese su Email" sx={{display: "block", margin: "10px 0"}} name="email" onChange={handleChange} />
                            <TextField variant="filled" label="Ingrese su Password" sx={{display: "block", margin: "10px 0"}} name="password" onChange={handleChange} />
                            <TextField variant="filled" label="Vuelva a ingresar su Password" sx={{display: "block", margin: "10px 0"}} name="repassword" onChange={handleChange} />
                            <Button className="botonAddRegistro" variant="contained" color="primary" type="submit" >REGISTRAR</Button>
                            <p style={{paddingTop: "10px", color: "red", fontWeight: "bold"}}>{confirmacion ? "" : "Las passwords no coinciden"}</p>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
    } catch (error) {
        console.error("Error en la solicitud" + error)
    }
};