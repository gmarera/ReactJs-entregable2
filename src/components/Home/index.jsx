import ItemListContainer from "../ItemListContainer";
import styleshome from "./Home.module.scss";

const Home = () => {
  return (
    <>
      <h3 className={styleshome.title}>Catálogo de Libros</h3>
      <div className={styleshome.libros}>
        <ItemListContainer />
      </div>
    </>
  );
};

export default Home;
