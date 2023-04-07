import React, { useContext } from "react";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import stylesCartIcon from "./CartIcon.module.scss";
import { CartContext } from "../../context/CartContext";

const CartIcon = () => {
  const { cartLibros } = useContext(CartContext);
  return (
    <div className={stylesCartIcon.container}>
      <ShoppingCartCheckoutIcon fontSize="large" className={stylesCartIcon.icon} />
      <p className={stylesCartIcon.cantidad_productos}>{cartLibros ? cartLibros.length : 0}</p>
    </div>
  );
};

export default CartIcon;
