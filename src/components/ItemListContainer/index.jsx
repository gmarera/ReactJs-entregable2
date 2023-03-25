import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import stylesItemListContainer from "./ItemListContainer.module.scss";

const ItemListContainer = () => {
  const [libros, setLibros] = useState([]);
  const { categoriaNombre } = useParams();

  if (categoriaNombre) {
    useEffect(() => {
      fetch("/src/json/libros.json")
        .then((response) => response.json())
        .then((data) => setLibros(data.filter((libro) => libro.categoria.toUpperCase() == categoriaNombre.toUpperCase())));
    }, [categoriaNombre]);
  } else {
    useEffect(() => {
      fetch("/src/json/libros.json")
        .then((response) => response.json())
        .then((data) => setLibros(data));
    }, []);
  }

  return (
    <section>
      <div className={stylesItemListContainer.libros_lista}>
        {libros.map((libro) => (
          <Link to={`/libro/${libro.id}`}>
            <div key={libro.id} className={stylesItemListContainer.libro_card}>
              <h2 className={stylesItemListContainer.card_titulo}>{libro.titulo}</h2>
              <img className={stylesItemListContainer.card_img} src={libro.img} alt={libro.titulo} width={150} />
              <p className={stylesItemListContainer.card_precio}>${libro.precio}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ItemListContainer;
