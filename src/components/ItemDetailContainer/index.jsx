import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import stylesItemDetailContainer from "./ItemDetailContainer.module.scss";

const ItemDetailContainer = () => {
  const [libro, setLibro] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch("/src/json/libros.json")
      .then((response) => response.json())
      .then((data) => setLibro(data.find((libro) => libro.id == id)));
  }, [id]);

  return (
    <section className={stylesItemDetailContainer.container}>
      <div className={stylesItemDetailContainer.imagen}>
        <img src={libro.img} alt={libro.titulo} />
      </div>
      <div>
        <h2 className={stylesItemDetailContainer.titulo}>{libro.titulo}</h2>
        <p className={stylesItemDetailContainer.autor}>Autor: {libro.autor}</p>
        <p>Editorial: {libro.editorial}</p>
        <p>Páginas: {libro.paginas}</p>
        <p>Categoría: {libro.categoria}</p>
        <p>ISBN: {libro.id}</p>
        <br />
        <br />
        <br />
        <br />
        <p className={stylesItemDetailContainer.precio}>Precio: ${libro.precio}</p>
        <button className={stylesItemDetailContainer.boton}>Agregar al carrito</button>
      </div>
    </section>
  );
};

export default ItemDetailContainer;
