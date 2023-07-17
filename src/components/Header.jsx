import React, { useState } from 'react'
import '../css/header.css'
import menu from '../assets/menu.svg'
import search from '../assets/search.svg'

function Header() {

  const [searchOpen, setSearchOpen] = useState(false)
  async function searchAnimate(){
    const searchInput = document.getElementById('searchbar')
    const searchCont = document.getElementById('searchCont').style
    if(searchOpen){
      searchCont.width = '30px'
      searchInput.style.width = '0%'
      setSearchOpen(false)
    }
    else{
      searchCont.width = '200px'
      searchInput.style.width = '100%'
      searchInput.select()
      setSearchOpen(true)
    }
}
  return (
    <div className='header flex'>
      <div className="left-header-nav header-nav flex">
        <img src={menu} alt="menu" className="nav-link" id='menu' />
      </div>
      <div className="logo">Earhart
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