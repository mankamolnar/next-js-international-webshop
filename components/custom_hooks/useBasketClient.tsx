"use client";

import { useState, useEffect } from "react";


let instances : { [key : string] : any } = {};

export const addBasketToInstance = (id : string, basketInstance : any) => {
  instances[id] = basketInstance;
}

const refreshAllBaskets = () => {
  for (const basketId in instances) {
    instances[basketId].refresh();
  }
}

const deleteBasketFromInstances = (id : string) => {
  delete instances[id];
}

// kupon -> db
// szallitasi koltseg
// state singleton
// sumvalue -> db-ből dolgozza az adatokat
// UPDATE nextjs
// BASKET BUILDER!
const useBasketClient = () => {
  function setCookie(cname : string, cvalue : string, exdays : number) {
    if (typeof window === "undefined") {
      return;
    }
    
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname : string) {
    if (typeof window === "undefined") {
      return "";
    }

    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  const [ basketState, setBasketState ] = useState<any[]>([]);
  const [ basketId, setBasketId ] = useState("bid" + new Date().getTime());
  const [ lastRender, setLastRender ] = useState(new Date().getTime());

  useEffect(() => {
    return () => {
      deleteBasketFromInstances(basketId);
    };
  }, []);

  useEffect(() => {
    const basketCookie = getCookie("next_basket");

    let basket : any[];
    if (basketCookie) {
      basket = JSON.parse(basketCookie);
    } else {
      basket = [];
    }

    setBasketState(basket);
  }, [lastRender])

  const addProduct = (product : any, quantity : number) => {
    const basketCopy = [...basketState, {...product, quantity: quantity}];
    setBasketState(basketCopy);
    setCookie("next_basket", JSON.stringify(basketCopy), 30);
    refreshAllBaskets()
  }

  const findProductById = (productId : number) => {
    for (let product of basketState) {
      if (product.id === productId) {
        return product;
      }
    }

    return undefined;
  }

  const changeQuantityTo = (productId : number, quantity : number) => {
    const basketCopy = [...basketState];

    for (let product of basketCopy) {
      if (product.id === productId) {
        product.quantity = quantity;
      }
    }
    
    setBasketState(basketCopy);
    setCookie("next_basket", JSON.stringify(basketCopy), 30);
    refreshAllBaskets();
  }

  const deleteProductById = (productId : number) => {
    const basketCopy = basketState.filter((product) => product.id !== productId);

    setBasketState(basketCopy);
    setCookie("next_basket", JSON.stringify(basketCopy), 30);
    refreshAllBaskets()
  }

  const sumProductValue = () => {
    let sum = 0;

    for (let product of basketState) {
      sum += product.price * product.quantity;
    }

    return sum;
  }

  const clearBasket = () => {
    setBasketState([]);
    setCookie("next_basket", JSON.stringify([]), 30);
    refreshAllBaskets();
  }

  const getBasketId = () => {
    return basketId;
  }

  const refresh = () => {
    setLastRender(new Date().getTime());
  }


  return {
    currentState: basketState,
    addProduct: addProduct,
    findProductById: findProductById,
    changeQuantityTo: changeQuantityTo,
    deleteProductById: deleteProductById,
    sumProductValue: sumProductValue,
    clearBasket: clearBasket,
    getBasketId: getBasketId,
    refresh: refresh
  };
};

export default useBasketClient;