import React from 'react'
import useFetch from '../hooks/useFetch'
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Spinner from '../utils/Spinner'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import ProductContainer from '../components/ProductContainer'

export default function CategoryId() {
    const { categoryid }= useParams()
    const { error, data, loading } = useFetch(`https://ecommtest.onrender.com/categories/${categoryid}/products`)
    
  return (
    <Container style={{marginTop: '5rem'}}>
        {loading && <Spinner/>}
        {error || data && (
            <>
            {error && <p>{error.message}</p>}
            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1200: 4}}
            >
                <Masonry gutter= "30px">
                  {data.map((product) => (
                    <ProductContainer key={product.id} {...product}/>
                  ))}  
                    
                </Masonry>
            </ResponsiveMasonry>

            </>
        )}
    </Container>
  )
}
