import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Twirl as Hamburger } from "hamburger-react";
import Navlocker from './Navlocker'

export default function Navhead() {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if(isOpen) {
      document.body.style.overflow= 'hidden'
    }else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])


  return (
    <div className="position-fixed top-0 w-100" style={{zIndex: "10"}}>
      <Container className="d-flex align-items-center justify-content-between p-2">
        <div className="d-flex align-items-center gap-3 gap-md-5" style={{zIndex: '10'}}>
          <Hamburger size={20} toggled={isOpen} toggle={setOpen} />
          <NavLink to="/" className="text-black fs-1 align-items-center">
            Estore
          </NavLink>
        </div>
        <div className="d-flex justify-content-center align-items-center gap-5">
          <NavLink to="/search" className="text-dark text-decoration-underline">
            search
          </NavLink>
          <div className="d-flex gap-3">
            <NavLink to='/login' className="text-secondary ">log in</NavLink>
            <NavLink to="/cart" className="text-secondary ">
              <AiOutlineShoppingCart size="1.5rem" />
            </NavLink>
          </div>
        </div>
      </Container>
      {isOpen && <Navlocker isOpen={isOpen} setOpen={setOpen}/>}
    </div>
  );
}
