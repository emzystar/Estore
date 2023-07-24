import {useEffect, useState} from "react";
import axios from "axios";


export default function useFetch(url) {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect( ()=> {
        const fetchData = async() =>{
            try{
                setLoading(true)
                const response = await axios.get(url)
                setData(response.data)

            } catch{
                console.log(error)
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [url])
  return {data, error, loading}
    
}
