import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext([]);

const CartProvider = ({ children }) => {
  const cart = JSON.parse(localStorage.getItem("cartLibros"));
  const [cartLibros, setCartLibros] = useState(cart ? cart : []);

  const agregar = (libro) => {
    const libroEnCarrito = cartLibros.findIndex((item) => item.id === libro.id);

    if (libroEnCarrito !== -1) {
      const actualizarCarrito = [...cartLibros];
      actualizarCarrito[libroEnCarrito].cantidad += 1;
      setCartLibros(actualizarCarrito);
    } else {
      const nuevoCarrito = [...cartLibros, { ...libro, cantidad: 1 }];
      setCartLibros(nuevoCarrito);
    }
  };

  const restar = (libro) => {
    const libroRepetido = cartLibros.find((item) => item.id === libro.id);

    libroRepetido.cantidad !== 1 &&
      setCartLibros(cartLibros.map((item) => (item.id === libro.id ? { ...item, cantidad: libroRepetido.cantidad - 1 } : item)));
  };

  const borrar = (id) => {
    const buscarID = cartLibros.find((item) => item.id === id);

    const nuevoCarrito = cartLibros.filter((item) => {
      return item !== buscarID;
    });
    setCartLibros(nuevoCarrito);
  };

  useEffect(() => {
    localStorage.setItem("cartLibros", JSON.stringify(cartLibros));
  }, [cartLibros]);

  return (
    <CartContext.Provider
      value={{
        agregar,
        cartLibros,
        restar,
        borrar,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
