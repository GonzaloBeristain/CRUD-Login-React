import { useEffect, useState } from "react";
import {Grid, Card, CardContent, Typography} from "@mui/material";

export const Perfil = () => {
    const [usuario, setUsuario] = useState([]);
    
    const cargarUsuario = async (token) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/usuarios/perfil?token=${token}`)
            const data = await response.json()
            
            setUsuario(data.data)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token")
        cargarUsuario(token)
    }, []);

    return (
        <Grid container alignItems="center" justifyContent="center" direction="column">
            <Card sx={{ minWidth: 275, my: 2, backgroundColor: "aliceblue" }}>
                <CardContent>
                    <Typography variant="h6" component="div" textAlign="center" sx={{fontWeight: "bold", fontSize: "50px"}}>
                        Bienvenido!
                    </Typography>
                    <Typography variant="h5" component="div" textAlign="center" sx={{fontSize: "40px"}}>
                        {usuario.nombre}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
};