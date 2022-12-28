import React, { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';
import { toast } from 'react-hot-toast';
import { IProduct } from '../types';

interface IState {
  showCart?: boolean;
  setShowCart?: (show: boolean) => void;
  cartItems?: IProduct[];
  totalPrice?: number;
  totalQuantities?: number;
  qty?: number;
  incQty?: () => void;
  decQty?: () => void;
  onAdd?: (item: IProduct, quantity: number) => void;
  toggleCartItemQuanitity?: (id: string, value: string) => void;
  onRemove?: (item: IProduct) => void;
  setCartItems?: (items: IProduct[]) => void;
  setTotalPrice?: (num: number) => void;
  setTotalQuantities?: (num: number) => void;
}
const SContext = createContext<IState | null>(null);

export const StateContext = ({ children }: PropsWithChildren) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<IProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct: IProduct;
  let index;

  const onAdd = (product: IProduct, quantity: number) => {
    const checkProductInCart = cartItems.find((item: IProduct) => item._id === product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct: IProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
        return { ...cartProduct };
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemove = (product: IProduct) => {
    foundProduct = cartItems.find((item) => item._id === product._id) as IProduct;
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    if (foundProduct) {
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity,
      );
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
      setCartItems(newCartItems);
    }
  };

  const toggleCartItemQuanitity = (id: string, value: string) => {
    foundProduct = cartItems.find((item: IProduct) => item._id === id) as IProduct;
    if (!foundProduct) {
      return;
    }

    index = cartItems.findIndex((product: IProduct) => product._id === id);
    const newCartItems = cartItems.filter((item: IProduct) => item._id !== id);

    if (foundProduct) {
      if (value === 'inc') {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
      } else if (value === 'dec') {
        if (foundProduct && foundProduct.quantity > 1) {
          setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
          setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
          setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
        }
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  const iState: IState = {
    showCart,
    setShowCart,
    cartItems,
    totalPrice,
    totalQuantities,
    qty,
    incQty,
    decQty,
    onAdd,
    toggleCartItemQuanitity,
    onRemove,
    setCartItems,
    setTotalPrice,
    setTotalQuantities,
  };
  return <SContext.Provider value={iState}>{children}</SContext.Provider>;
};

export const useStateContext = () => useContext(SContext);
