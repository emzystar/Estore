import React from 'react'
import HeroProduct from '../components/HeroProduct'
import HeroCategory from '../components/HeroCategory'
import useFetch from '../hooks/useFetch'
import FeaturProducts from '../components/FeaturProducts'

export default function Home() {
    const {data, error, loading} = useFetch('https://ecommtest.onrender.com/products')
  return (
    <>
        <HeroProduct data={data} error={error} loading={loading}/>
        <HeroCategory/>
        <FeaturProducts data={data} error={error} loading={loading}/>
        
    </>
  )
}
