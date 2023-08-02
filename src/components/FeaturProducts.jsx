import React, { useRef } from "react";
import { Container, Image, Button } from "react-bootstrap";
import Spinner from "../utils/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import FormatCurrency from "../utils/FormatCurrency";
import { useStateContext } from "./lib/ContextApi";
import toast from "react-hot-toast"

export default function FeaturProducts({ data, error, loading }) {
  const {increaseBagQuantity} = useStateContext()
  const scrollRef = useRef();
  const scroll = (direction) => {
    const { current } = scrollRef;
    direction === "left"
      ? (current.scrollLeft -= 500)
      : (current.scrollLeft += 500);
  };
  const featureProduct = data.filter(
    (product) => product.price >= 700 && product.price <= 5000
  );
  
  return (
    <Container className="mt-5 p-3">
      <h6 className="mt-5">Featured Products</h6>
      {loading && <Spinner />}
      {error ||
        (featureProduct && (
          <>
            {error && <p>{error.message}</p>}
            <div className="position-relative">
              <Container
                ref={scrollRef}
                style={{ scrollBehavior: "smooth" }}
                className="d-flex overflow-scroll scrollBody"
              >
                {featureProduct.slice(0, 9).map((product) => (
                  <div key={product.id}>
                    <Link to={`/product/${product.id}`}>
                      <div  className='mx-4' style={{ width: "270px", height: "370px" }}>
                        <Image
                          className="w-100 h-100"
                          src={product.images[2]}
                          alt={product.title}
                        />
                      </div>
                    </Link>
                    <p className="text-dark">{product.title}</p>
                    <p className='text-dark'>{FormatCurrency(product.price)}</p>
                    <Button variant='outline-dark' className='border-none rounded-0' onClick={() => {increaseBagQuantity(product.id)
                      toast.success(`${product.title} added to bag`)}}>ADD TO BAG</Button>
                  </div>
                ))}
              </Container>
              <div className='d-none d-md-block w-100 position-absolute top-50'>
                <div className='d-flex justify-content-between align-items-center'>
                    <AiOutlineArrowLeft  size="2rem" style={{cursor: "pointer"}} onClick={()=> scroll("left")}/>
                    <AiOutlineArrowRight size="2rem" style={{cursor: "pointer"}} onClick={()=> scroll("right")}/>

                </div>

              </div>
            </div>
          </>
        ))}
    </Container>
  );
}
