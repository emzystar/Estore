import React from 'react'
import useFetch from '../hooks/useFetch'
import { Container } from 'react-bootstrap'
import Spinner from '../utils/Spinner'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import ProductContainer from '../components/ProductContainer'
import { Outlet, useLocation } from 'react-router-dom'

export default function Products() {
  const location = useLocation()
  const { data, error, loading } = useFetch('https://ecommtest.onrender.com/products')
  return (
    <Container style={{marginTop: '5rem'}}>
      {location.pathname === '/product' ?
      <>
      {loading && <Spinner/>}
      {error || data && (
        <>
        {error && <p>{error.message}</p>}
        {data && (
        <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1200: 4}}
            >
                <Masonry gutter= "30px">
                  {data.map((product) => (
                    <ProductContainer key={product.id} {...product}/>
                  ))}  
                    
                </Masonry>
            </ResponsiveMasonry>
        )}
        </>
      )}
      </>
     : <Outlet/> }

    </Container>
  )
}
