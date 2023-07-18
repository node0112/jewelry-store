import React, { useEffect, useState } from 'react'
import '../css/sidebar.css'
import arrow from '../assets/arrowback.svg'
import deco from '../assets/sidebar-deco.svg'

function Sidebar({closeSidebar}){

  const [drawerOpen, setDrawerOpen] = useState(false)

  async function backPress(){ //handles press of the back arrow in the sidebar
    if(drawerOpen){
      const wrapper = document.querySelector('.drawers-wrapper')
      setDrawerOpen(false)
      wrapper.style.transform = 'translateX(0px)'
    }
    else{
     closeSidebar()
  }
}

  useEffect(()=>{
    const links = document.querySelectorAll('.sidebar-link')
    const wrapper = document.querySelector('.drawers-wrapper')
    links.forEach(link =>{
      link.addEventListener('click', ()=>{
        wrapper.style.transform = 'translateX(-270px)'
        setDrawerOpen(true)
      })
    })
    links.forEach(link =>{
      link.addEventListener('mouseover', ()=>{
        const drawerToShow = link.textContent.toLowerCase()
        const drawer = document.getElementById(drawerToShow)
        console.log(drawer)
        const showing = document.querySelector('.drawer-show') //remove any existing drawer
        if(showing) showing.classList.remove('drawer-show')
        drawer.classList.add('drawer-show')
      })
    })
  },[])
  return (
    <div className='sidebar flex vertical'>
        <img src={arrow} alt="back" className='cursor' id='sidebar-back'  onClick={backPress}/>
        <img src={deco} style={{position: 'absolute', bottom: '18px', right: '30px'}} alt="" />
        <div className="sidebar-wrapper flex">
            <div className="drawers-wrapper flex">
              <div className="sidebar-container-main flex column horizontal" style={{gap: '40px'}}>
                <div className="sidebar-link cursor">Collections</div>
                <div className="sidebar-link cursor">Designers</div>
                <div className="sidebar-link cursor">Send a gift</div>
                <div className="sidebar-link cursor">Boutiques</div>
                <div className="sidebar-link cursor">Customized Jewelry</div>
                <div className="sidebar-link cursor">Valuable Metals Pricing</div>
                <span className="sidebar-sep" />
                <div className="flex column horizontal" style={{gap: '35px'}}>
                  <div className="account-link cursor">Account</div>
                  <div className="account-link cursor">Appointments</div>
                  <div className="account-link cursor">Orders & History</div>
                  <div className="account-link cursor">Talk With Us</div>
                </div>
              </div>
              <div id="collections" className="sidebar-drawer">
                <div className="drawer-title">Collections</div>
                <div className="drawer-link">Rings & Earrings</div>
                <div className="drawer-link">Bracelets</div>
                <div className="drawer-link">Watches</div>
                <div className="drawer-link">Necklaces</div>
                <div className="drawer-link">Cuff Links</div>
              </div>
              <div id="designers" className="sidebar-drawer">
                <div className="drawer-title">Our Designers</div>
                <div className="drawer-link">Alessandro Michele</div>
                <div className="drawer-link">Sabato De Sarno</div>
                <div className="drawer-link">Tom Ford</div>
              </div>
              
            </div>
        </div>
    </div>
  )
}

export default Sidebar