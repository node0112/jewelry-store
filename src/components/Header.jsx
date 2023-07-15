import React, { useState } from 'react'
import '../css/header.css'
import menu from '../assets/menu.svg'
import search from '../assets/search.svg'

function Header() {

  const [searchOpen, setSearchOpen] = useState(false)
  async function searchAnimate(){
    const searchInput = document.getElementById('searchbar').style
    const searchCont = document.getElementById('searchCont').style
    if(searchOpen){
      searchCont.width = '30px'
      searchInput.width = '0%'
      setSearchOpen(false)
    }
    else{
      searchCont.width = '200px'
      searchInput.width = '100%'
      setSearchOpen(true)
    }
}
  return (
    <div className='header flex'>
      <div className="left-header-nav header-nav flex">
        <img src={menu} alt="menu" className="nav-link" id='menu' />
      </div>
      <div id="logo">Earhart
      <div className="logo-subtext">
        Wear Your Shine</div></div>
      <div className="right-header-nav header-nav flex">
        <div className="nav-link">Boutiques</div>
        <div className="flex" id='searchCont' style={{gap: '10px', width: '30px'}}>
          <img className="nav-link flex cursor" onClick={searchAnimate} src={search} />
          <input type="text" id='searchbar'/>
        </div>
      </div>
    </div>
  )
}

export default Header               