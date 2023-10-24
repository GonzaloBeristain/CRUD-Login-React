import { useEffect, useState } from "react";
import {Button, Card, CardContent, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./css/ListaPaises.css";

export function ListaPaises() {
    const [pais, setPais] = useState([]);
    const navigate = useNavigate();

    const cargarPaises = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/v1/pais")
                const data = await response.json()
                setPais(data.data)
            } catch (error) {
                console.log(error)
            }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3000/api/v1/pais/${id}`, {
            method: "DELETE",
        })
        
        setPais(pais.filter(paises => paises.id !== id));
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        cargarPaises();
    }, []);

    return (
        <div className="divLista">
            <h1 className="tituloLista">LISTA DE PAÍSES</h1>
            {pais.map((paises) => (
                <Card className="cardList" key={paises.id}>
                    <CardContent className="contenedorCard">
                        <div>
                            <Typography><b>Nombre:</b> {paises.nombre}</Typography>
                            <Typography><b>Capital:</b> {paises.capital}</Typography>
                            <Typography><b>Continente:</b> {paises.continente}</Typography>
                            <img style={{width: "90px", height: "60px", paddingTop: "10px"}} src={"http://localhost:3000/api/v1/pais/../../../public/upload/" + paises.imagen} alt={"IMG-BANDERA-" + paises.nombre} />
                        </div>
                        <div>
                            <Button variant="contained" color="inherit" onClick={() => {navigate(`/lista/${paises.id}/edit`)}}>
                            EDITAR
                            </Button>
                            <Button variant="contained" color="error" onClick={() => {handleDelete(paises.id)}} style={{marginLeft: ".5rem"}}>
                                ELIMINAR
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
};