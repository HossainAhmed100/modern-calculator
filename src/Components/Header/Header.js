import React from 'react'
import './Header.css'
import { RiSettings4Fill, RiHistoryLine } from 'react-icons/ri'

function Header() {
  
  return (
    <div className='header'>
    <div className='header_container'>
     <div><p>{<RiSettings4Fill size={20} className="icons"/>}</p></div>
     <div className='logo_text'><p>Calculator</p></div>
     <div><p>{<RiHistoryLine size={20} className="icons"/>}</p></div>
    </div>
    </div>
  )
}

export default Header