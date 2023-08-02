import React from "react";
import { useStateContext } from "../components/lib/ContextApi";
import useFetch from "../hooks/useFetch";
import { Container } from "react-bootstrap";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import BagItems from '../components/BagItems'
import FormatCurrency from "../utils/FormatCurrency";



export default function Cart() {
  const { error, data } = useFetch("https://ecommtest.onrender.com/products");
  console.log("ewe", data);
  const { bagItems } = useStateContext();

  const getTotal = bagItems?.reduce((total, bagItem) => {
    const totalItem = data.find((i) => i.id === bagItem.id);
    return total + (totalItem?.price || 0) * bagItem.quantity;
  }, 0);

  return (
    <Container style={{ paddingTop: "5rem" }}>
      {bagItems.length ? (
        <h6 className="font"> CART {bagItems.length}</h6>
      ) : (
        <h6 className="text-start text-sm font-bold">Your Bag Is Empty</h6>
      )}
      {error ||
        (data && (
          <div className="h-100">
            {error && <p>{error.message}</p>}
            {data && (
              <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}
              >
                <Masonry gutter="30px">
                  {bagItems.map((item, index) => (
                    <BagItems key={index} {...item} data={data} />
                  ))}
                </Masonry>
              </ResponsiveMasonry>
            )}
            <div className="d-flex gap-3 font-bold text-sm ms-3 justify-content-end">
                <p>Total <span className='fw-bold ms-3'>{FormatCurrency(getTotal)}</span></p>
               
            </div>

          </div>
        ))}
    </Container>
  );
}
