"use client";

import { useEffect, useState } from "react";
import useBasketClient, { addBasketToInstance } from "../../../components/custom_hooks/useBasketClient";

const Basket = (props : any) => {

  const [ firstRender, setFirstRender ] = useState(true);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  const basket = useBasketClient();
  addBasketToInstance(basket.getBasketId(), basket);

  return <div>
    {
      !firstRender && (
        basket.currentState.map((product : any, index : number) => (
          <div key={"product" + index}>
            {product.name} | {product.price} Ft
            | <button onClick={() => basket.changeQuantityTo(product.id, product.quantity - 1)}>-</button> {product.quantity} <button  onClick={() => basket.changeQuantityTo(product.id, product.quantity + 1)}>+</button> | Össz: {product.price * product.quantity} |
            <button onClick={() => basket.deleteProductById(product.id)}>Törlés</button>
          </div>
        ))
      )
    }


    <button onClick={() => basket.addProduct({ id: new Date().getTime(), name: "Nokia 3310", price: 500000 }, 1)}>Add nokia</button>
    <button onClick={() => basket.clearBasket()}>Clear basket</button>

  </div>
}

export default Basket;