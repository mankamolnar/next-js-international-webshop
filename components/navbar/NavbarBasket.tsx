"use client";

import useBasketClient, { addBasketToInstance } from "../custom_hooks/useBasketClient";

const NavbarBasket = () => {

  const basket = useBasketClient();
  addBasketToInstance(basket.getBasketId(), basket);

  return <span>
    {basket.sumProductValue()} Ft
  </span>
}

export default NavbarBasket;