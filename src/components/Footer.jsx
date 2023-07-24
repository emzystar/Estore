import React from 'react'
import { Container } from 'react-bootstrap'

export default function Footer() {
    const links =[
        {
            name: "facebook",
            href: "facebook.com",
            id: 1,
        }, 
        {
            name: "twitter",
            href: "twitter.com",
            id: 2,
        },
        {
            name: "instagram",
            href: "instagram.com",
            id: 3,
        },
        {
            name: "pinterest",
            href: "pinterest.com",
            id: 4,
        }
    ]

    const infos = [
        { name: "cookies settings", id: 1},
        { name: "privacy settings", id: 2},
        { name: "return", id: 3},
        { name: "store", id: 4}
    ]
  return (
    <Container className='py-5 px-2 d-flex align-items-center justify-content-center'>
        <div className="d-flex flex-column gap-5 justify-content-center text-center">
            <h1>JOIN OUR NEWS LETTER</h1>
            <div className="d-md-flex gap-4 justify-content-center align-items-center">
                {links.map((item)=> (
                    <a href={`/item/${item.href}`} target='_blank' key={item.id}>
                        <p className="text-uppercase font-normal text-sm text-black-50">
                            {item.name}
                        </p>
                    </a>
                ))}
            </div>
            <div className='d-md-flex justify-content-center align-items-center gap-5'>
               {infos.map((rest) => (
                <a href={`/rest/${rest.id}`} target="_blank"rel='noreferrer' key={rest.id}>
                    <p className="text-black font-normal text-xs mx-2">{rest.name}</p>
                </a>
               ))}

            </div>

        </div>
       
       
    </Container>
  )
}
