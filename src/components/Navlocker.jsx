import React from "react"
import useFetch from "../hooks/useFetch"
import { Link } from "react-router-dom";
import Spinner  from '../utils/Spinner'

export default function Navlocker({isOpen, setOpen}) {
    const {data: categories, error, loading} = useFetch('https://ecommtest.onrender.com/categories')
    

  return (
    <div className="position-fixed top-0 h-100">
      <div className="p-4 bg-light h-100" style={{ width: "24rem" }}>
        <div style={{ marginTop: "5rem" }}>
          <Link to="/product" onClick={()=> setOpen(!isOpen)}>
            <p className="text-dark">Products</p>
          </Link>
          <p>Categories</p>
          {loading && <Spinner/>}
          {error || categories && (
            <>
            {error && <p>(error.message</p>}
            {categories.map((category)=> (
                <Link to={`/categories/${category.id}`} key={category.id} onClick={()=> setOpen(!isOpen)}>
                <p className='text-sm mt-4 text-secondary'>{category.name}</p>
              </Link>

            ))}
            </>
          )}
          
        </div>
      </div>
    </div>
  );
}
