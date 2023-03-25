import React from "react";
import logo from "../../assets/logo.png";
import carrito from "../../assets/carrito.png";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useEffect } from "react";
import styles from "./Navbar.module.scss";

const Navbar = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const activeStyle = {
    color: "blue",
  };

  useEffect(() => {
    fetch("/src/json/categorias.json")
      .then((response) => response.json())
      .then((data) => setCategorias(data));
  }, []);

  return (
    <header className={styles.container}>
      <Link to="/">
        <img className={styles.logo} src={logo} alt="readme.txt" />
      </Link>
      <nav className={styles.nav}>
        <ul>
          {categorias.map((categoria, index) => (
            <NavLink
              key={index}
              to={`categoria/${categoria.name}`}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <li>{categoria.name}</li>
            </NavLink>
          ))}
        </ul>
      </nav>
      <Link to="/carrito">
        <img className={styles.cart} src={carrito} alt="Carrito de Compras" width={50} />
      </Link>
      {children}
    </header>
  );
};

export default Navbar;
