import React from "react";
import useFetch from "../hooks/useFetch";
import Spinner from "../utils/Spinner";
import { Carousel, Container, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HomeCategory() {
  const {
    data: categories,
    error,
    loading,
  } = useFetch("https://ecommtest.onrender.com/categories")
  const bannerCategory = categories.filter(
    (category) => category.name === "Fashion" || category.name === "Earpiece"
  );
  console.log("banner", bannerCategory);

  return (
    <Container className="mt-4">
      {loading && <Spinner/>}
      {error ||
        (categories && (
          <>
            {error && <p>{error.message}</p>}
            <Carousel>
              {bannerCategory.map((banner) => (
                <Carousel.Item key={banner.id}>
                  <Image
                    className="d-block w-100 "
                    src={banner.image}
                    alt ={banner.name}
                    style={{ height: "600px" }}
                  />
                  <Carousel.Caption>
                    <h1 className="display-3">{banner.name}</h1>
                    <Link to={`/categories/${banner.id}`}>
                      <Button
                        variant="dark"
                        size="lg"
                        className="border-none rounded-0"
                      >
                        SEE MORE 
                      </Button>
                    </Link>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </>
        ))}
    </Container>
  );
}
