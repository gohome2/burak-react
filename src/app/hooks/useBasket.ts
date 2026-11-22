import { useState } from "react";
import { CartItem } from "../../lib/types/search";

const useBasket = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const cartJson = localStorage.getItem("cartData");
    return cartJson ? JSON.parse(cartJson) : [];
  });

  const onAdd = (input: CartItem) => {
    const exist = cartItems.find((item) => item._id === input._id);
    const cartUpdate = exist
      ? cartItems.map((item) =>
          item._id === input._id
            ? { ...exist, quantity: exist.quantity + 1 }
            : item,
        )
      : [...cartItems, { ...input }];

    setCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  };

  const onRemove = (input: CartItem) => {
    const exist = cartItems.find((item) => item._id === input._id);
    if (!exist) return;

    const cartUpdate =
      exist.quantity === 1
        ? cartItems.filter((item) => item._id !== input._id)
        : cartItems.map((item) =>
            item._id === input._id
              ? { ...exist, quantity: exist.quantity - 1 }
              : item,
          );

    setCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  };

  const onDelete = (input: CartItem) => {
    const cartUpdate = cartItems.filter((item) => item._id !== input._id);
    setCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  };

  const onDeleteAll = () => {
    setCartItems([]);
    localStorage.removeItem("cartData");
  };

  return { cartItems, onAdd, onRemove, onDelete, onDeleteAll };
};

export default useBasket;
