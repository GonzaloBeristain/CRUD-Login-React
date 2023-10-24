import { Grid, Card, Typography, CardContent, TextField, Button, CircularProgress } from "@mui/material";
import "./css/NuevoPais.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const NuevoPais = () => {
    const [pais, setPais] = useState({
        nombre: "",
        capital: "",
        continente: "",
        imagen: "",
    });

    const [loading, setLoading] = useState(false);
    const [editar, setEditar] = useState(false);

    const navigate = useNavigate();
    const params = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData();
        formData.append("nombre", pais.nombre);
        formData.append("capital", pais.capital);
        formData.append("continente", pais.continente);
        formData.append("imagen", pais.imagen);

        if (editar) {
            await fetch(`http://localhost:3000/api/v1/pais/${params.id}`, {
            method: "PUT",
            body: formData,
        })
        } else {
            await fetch("http://localhost:3000/api/v1/pais", {
            method: "POST",
            body: formData,
        })
        };
        setLoading(false)
        navigate("/")
    };

    const handleChange = (e) => {
        if (e.target.name === "imagen") {
            setPais({ ...pais, [e.target.name]: e.target.files[0] });
        } else {
            setPais({ ...pais, [e.target.name]: e.target.value });
        }
    };

    const cargarPais = async (id) => {
        const response = await fetch(`http://localhost:3000/api/v1/pais/${id}`)
        const data = await response.json();
        console.log(data)
        setPais({nombre: data.data.nombre, capital: data.data.capital, continente: data.data.continente, imagen: data.data.continente })
        setEditar(true)
    };

    useEffect(() => {
        if (params.id) {
            cargarPais(params.id)
        }
    }, [params.id])

    return (
        <Grid container alignItems="center" justifyContent="center" direction="column" >
            <Grid item xs={3}>
                <Card className="card" sx={{mt: 5}}>
                    <Typography className="titulo" variant="h5" textAlign="center" fontWeight="bold" fontSize="27px">
                        {editar ? "EDITAR PAÍS" : "REGISTRAR PAÍS"}
                    </Typography>
                    <CardContent >
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <TextField variant="filled" type="text" label="Escriba el nombre" sx={{display: "block", margin: "10px 0"}} name="nombre" value={pais.nombre} onChange={handleChange} />
                            <TextField variant="filled" type="text" label="Escriba la capital" sx={{display: "block", margin: "10px 0"}} name="capital" value={pais.capital} onChange={handleChange} />
                            <TextField variant="filled" type="text" label="Escriba el continente" sx={{display: "block", margin: "10px 0"}} name="continente" value={pais.continente} onChange={handleChange} />
                            <TextField type="file" variant="filled" sx={{display: "block", margin: "10px 0"}} name="imagen" onChange={handleChange} />
                            <Button className="botonAdd" variant="contained" color="primary" type="submit" disabled={!pais.nombre || !pais.capital || !pais.continente} >{loading ? (<CircularProgress color="inherit" size={24} />) : ("GUARDAR")}</Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
};