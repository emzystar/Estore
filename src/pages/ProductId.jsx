import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import Spinner from "../utils/Spinner";
import FormatCurrency from "../utils/FormatCurrency";
import { useStateContext } from "../components/lib/ContextApi";
import toast from "react-hot-toast";

export default function ProductsId() {
  const [index, setIndex] = useState(0);
  const { productid } = useParams();
  const { data, error, loading } = useFetch(
    `https://ecommtest.onrender.com/products/${productid}`
  );

  const { increaseBagQuantity } = useStateContext();

  const { data: products } = useFetch(
    "https://ecommtest.onrender.com/products"
  );
  const relatedProducts = products.filter(
    (product) => product.category?.name === data.category?.name
  );

  const filteredById = relatedProducts.filter(
    (product) => product.id !== data.id
  );

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: "0" });
  }, [productid]);
  return (
    <Container>
      {loading && <Spinner />}
      {error ||
        (data && (
          <>
            <Row className="mt-5 g-4 h-100">
              {error && <p>{error.messsage}</p>}
              <Col md={8}>
                <div className="d-md-flex align-items-center h-100 gap-4">
                  <div className="mb-4 align-self-end gap-2">
                    <h6 className="text-start">{data.title}</h6>
                    <p>{data.category?.name}</p>
                  </div>
                  <div className="d-md-flex mb-4 adjustImg">
                    <Image
                      src={data.images && data.images[index]}
                      alt={data.title}
                      className="w-100 h-100"
                    />
                  </div>
                  <div className="d-flex flex-md-column align-self-start">
                    {data.images?.map((image, i) => (
                      <Image
                        key={i}
                        src={image}
                        alt=".."
                        style={{ height: "70px", width: "70px" }}
                        className={i === index ? "border border-dark" : ""}
                        onMouseEnter={() => setIndex(i)}
                      />
                    ))}
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="d-md-flex align-items-center gap-4 h-100">
                  <div className="align-self-end gap-2 mb-4">
                    <h6 className="font-bold">DESCRIPTION</h6>
                    <p className="text-sm text-secondary">{data.description}</p>
                    <p>{FormatCurrency(data.price)}</p>
                    <Button
                      variant="dark"
                      className="border-none rounded-0 w-100"
                      onClick={() => {
                        increaseBagQuantity(data.id);
                        toast.success(`${data.title} added to bag`);
                      }}
                    >
                      ADD TO BAG
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </>
        ))}
      <div style={{ marginTop: "5rem" }} className="">
        <h6 className="text-start text-small font-bold">similar items</h6>
        <div className="mt-5 d-flex overflow-auto gap-4 w-100">
          {filteredById.map((item) => (
            <div className="flex-shrink-0" key={item.id}>
              <Link to={`/product/${item.id}`}>
                <div className="" style={{ width: "270px", height: "350px" }}>
                  <Image
                    className="h-100 w-100"
                    src={item.images[0]}
                    alt={item.id}
                  />
                </div>
              </Link>
              <p className="text-dark mb-0 text-sm">{item.title}</p>
              <p className="text-secondary mb-0 text-sm">
                {FormatCurrency(item.price)}
              </p>
              <Button
                variant=" outline-dark"
                className="border-none rounded-0"
                onClick={() => {increaseBagQuantity(item.id) 
                  toast.success(`${item.title} added to bag`)}}
              >
                ADD TO BAG
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
