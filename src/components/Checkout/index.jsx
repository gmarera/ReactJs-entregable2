import React from "react";
import { CartContext } from "../../context/CartContext";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import stylesCheckout from "./Checkout.module.scss";

function Checkout() {
  const { cartLibros, agregar, restar, borrar } = useContext(CartContext);
  const precioTotal = cartLibros.reduce((acc, libro) => acc + libro.precio * libro.cantidad, 0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const onSubmit = (data) => {
    reset();
    setShowSuccessMessage(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  };

  const watchEmail1 = watch("email1");
  const watchEmail2 = watch("email2");

  return (
    <div className={stylesCheckout.container}>
      <div>
        <h2 className={stylesCheckout.title}>Checkout</h2>
      </div>
      <div className={stylesCheckout.compra}>
        <h4 className={stylesCheckout.detalletitle}>Detalle de su compra: </h4>
        <br />
        <div>
          {cartLibros && cartLibros.length > 0 ? (
            cartLibros.map((libro) => (
              <div key={libro.id}>
                <p key={libro.id}>
                  <strong>Título:</strong> {libro.titulo} - Cantidad: {libro.cantidad} - Precio total: ${" "}
                  {libro.precio * libro.cantidad}
                </p>
              </div>
            ))
          ) : (
            <p>Aún no hay libros en el Carrito de Compras.</p>
          )}
          <br />
          <h2 className={stylesCheckout.detalleprecio}>Precio Total: $ {precioTotal}</h2>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <p>
        <strong>Por favor, complete los siguientes datos para finalizar la compra.</strong>
      </p>

      <form className={stylesCheckout.formulario} onSubmit={handleSubmit(onSubmit)}>
        <div className={stylesCheckout.campo}>
          <label htmlFor="name">Nombre: </label>
          <input type="text" {...register("name", { required: true })} />
          {errors.name && <span>Este campo es requerido.</span>}
        </div>
        <div className={stylesCheckout.campo}>
          <label htmlFor="email1">Email: </label>
          <input type="email" {...register("email1", { required: true })} />
          {errors.email1 && <span>Este campo es requerido.</span>}
        </div>
        <div className={stylesCheckout.campo}>
          <label htmlFor="email2">Confirmar email: </label>
          <input type="email" {...register("email2", { required: true })} />
          {errors.email2 && <span> Este campo es requerido.</span>}
          {watchEmail1 !== watchEmail2 && <span> Los correos electrónicos no coinciden.</span>}
        </div>
        {showSuccessMessage && <div className={stylesCheckout.ok}>¡Su compra se procesó con éxito!. Gracias.</div>}
        <button type="submit" className={stylesCheckout.button}>
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Checkout;
