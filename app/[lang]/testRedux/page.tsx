"use client";

import { useAppDispatch, useAppSelector } from "./../../../redux/hooks";
import { setBasketState } from "./../../../redux/basketSlice";


const TestRedux = (props: any) => {
  const products = useAppSelector((state) => state.basketReducer.basket);
  const dispatch = useAppDispatch();

  return (
    <div>
      hi
      
      <button onClick={() => dispatch(setBasketState([{name: "test"}, ...products]))}> Add test</button>
      
      {products.map((product, index) => <div key={index}>{product.name}</div>)}
    </div>
  )
}


export default TestRedux;