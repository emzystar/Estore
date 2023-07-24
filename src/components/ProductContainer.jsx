import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import FormatCurrency from '../utils/FormatCurrency'

export default function ProductContainer({id, images, title, price}) {
    
  return (
    <Link to={`/product/${id}`}>
        <>
            <div style={{height: '450px'}}>
                <Image src={images[0]} alt={title} className="w-100 h-100 "/>
            </div>
            <div className='d-flex justify-content-between'>
                <p className="text-dark">{title}</p>
                <p className='text-sm text-black'>{FormatCurrency(price)}</p>
            </div>
        </>
    </Link>
  )
}
