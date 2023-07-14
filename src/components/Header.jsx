import React from 'react'
import '../css/header.css'

function Header() {
  return (
    <div className='header flex'>
      <div className="left-header-nav header-nav flex">
        <div className="nav-link">Collections</div>
        <div className="nav-link">Commission</div>
      </div>
      <div id="logo">Earhart</div>
      <div className="right-header-nav header-nav flex">
        <div className="nav-link">Boutiques</div>
        <div className="nav-link">Appointments</div>
      </div>
    </div>
  )
}

export default Header               