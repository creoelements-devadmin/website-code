import React from 'react'
import { Link } from 'react-router-dom';

export const CreoLogo = () => {
  return (
    <Link to="/">
    <img src='/images/logo.png' className='creo-logo-top z-2 clickable' alt="Creo Elements LLP Logo" style={{zIndex:5000}}></img></Link>
  )
}
