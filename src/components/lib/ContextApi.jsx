import { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

let initialstate = [];

export const StateContext = ({ children }) => {
  const [bagItems, setBagItems] = useState(initialstate);
  console.log('bagItems', bagItems);

  useEffect(()=> {
    if (bagItems !== initialstate) {
        localStorage.setItem('updateBag', JSON.stringify(bagItems))
    }

  }, [bagItems])
  useEffect(()=> {
    const bagData =JSON.parse(localStorage.getItem('updateBag'))
    if(bagData) {
        setBagItems(bagData)
    }

  }, [])

  const increaseBagQuantity = (id) => {
    setBagItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseBagQuantity = (id) => {
    setBagItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const getItemQuantity = (id) => {
    return bagItems.find((item) => item.id === id?.quantity || 0);
  };

  const bagQuantity = bagItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );
  const removeFromBag = (id) => {
    setBagItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  };
  return (
    <Context.Provider
      value={{
        removeFromBag,
        bagQuantity,
        getItemQuantity,
        decreaseBagQuantity,
        increaseBagQuantity,
        bagItems,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
