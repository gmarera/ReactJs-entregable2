import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import stylesItemDetailContainer from "./ItemDetailContainer.module.scss";
import { CartContext } from "../../context/CartContext";

const ItemDetailContainer = ({ data }) => {
  const { agregar } = useContext(CartContext);
  const [libro, setLibro] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch("/src/json/libros.json")
      .then((response) => response.json())
      .then((data) => {
        const libroEncontrado = data.find((libro) => libro.id == id);
        setLibro(libroEncontrado);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      {loading ? (
        <h1>Cargando...</h1>
      ) : libro ? (
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
            <button className={stylesItemDetailContainer.boton} onClick={() => agregar(libro)}>
              Agregar al carrito
            </button>
          </div>
        </section>
      ) : (
        <p>Libro no Encontrado.</p>
      )}
    </div>
  );
};

export default ItemDetailContainer;
