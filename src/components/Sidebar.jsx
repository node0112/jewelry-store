import React, { useEffect, useState } from 'react'
import '../css/sidebar.css'
import arrow from '../assets/arrowback.svg'
import deco from '../assets/sidebar-deco.svg'
import { useNavigate } from 'react-router-dom'

function Sidebar({closeSidebar,setPageTitle, setCollectionName, setProductHero}){

  const [drawerOpen, setDrawerOpen] = useState(false)
  const navigate = useNavigate()

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

  useEffect(()=>{ //add eventlisteners for clicking links 
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
        const showing = document.querySelector('.drawer-show') //remove any existing drawer
        if(showing) showing.classList.remove('drawer-show')
        drawer.classList.add('drawer-show')
      })
    })
  },[])

  async function openProductPage(title, collection, heroImage){
    await setCollectionName(collection) //update collection name first since product page refreshes data when the collection changes by calling the getProducts function from app
    await setPageTitle(title)
    await setProductHero(heroImage)
    navigate('/products')
    setTimeout(() => {
      closeSidebar()
    }, 200);
  }
  
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
                  <div className="account-link cursor" onClick={()=>{navigate('/account')}}>Account</div>
                  <div className="account-link cursor">Appointments</div>
                  <div className="account-link cursor">Orders & History</div>
                  <div className="account-link cursor">Talk With Us</div>
                </div>
              </div>
              <div id="collections" className="sidebar-drawer">
                <div className="drawer-title">Collections</div>
                <div className="drawer-link" onClick={()=>{openProductPage('Rings & Earrings', 'rings', 'https://firebasestorage.googleapis.com/v0/b/earhart-jewelry.appspot.com/o/banner.png?alt=media&token=914f00d2-54f7-4d64-acdb-95ba559a392e')}}>Rings & Earrings</div>
                <div className="drawer-link" onClick={()=>{openProductPage('Bracelets', 'bracelets', '')}}>Bracelets</div>
                <div className="drawer-link" onClick={()=>{openProductPage('Necklaces', 'necklaces', 'https://firebasestorage.googleapis.com/v0/b/earhart-jewelry.appspot.com/o/necklace-hero.jpg?alt=media&token=c461d430-dedf-45c4-88ea-5bd1452966c3')}}>Necklaces</div>
                <div className="drawer-link" onClick={()=>{openProductPage('Cuff Links', 'cuff_links', 'https://firebasestorage.googleapis.com/v0/b/earhart-jewelry.appspot.com/o/cuff-links-hero.jpg?alt=media&token=57175d69-e135-41ed-b280-3432ad4da8f9')}}>Cuff Links</div>
              </div>
              <div id="designers" className="sidebar-drawer">
                <div className="drawer-title">Our Designers</div>
                <div className="drawer-link">Alessandro Michele</div>
                <div className="drawer-link">Sabato De Sarno</div>
                <div className="drawer-link">Tom Ford</div>
              </div>
              <div id="send a gift" className="sidebar-drawer">
                <div className="drawer-title">Gifting Options</div>
                <div className="drawer-link">Add a gift wrap</div>
                <div className="drawer-link">Gift Boxes</div>
                <div className="drawer-link">Gift Bags</div>
              </div>
              <div id="boutiques" className="sidebar-drawer">
                <div className="drawer-title">Find A Boutique</div>
                <div className="drawer-link">India</div>
                <div className="drawer-link">United States</div>
                <div className="drawer-link">France</div>
                <div className="drawer-link">Germany</div>
                <div className="drawer-link">Australia</div>
                <div className="drawer-link">U.A.E</div>
              </div>
              <div id="customized jewelry" className="sidebar-drawer">
                <div className="drawer-title">Custom Made For You</div>
                <div className="drawer-link">Watches</div>
                <div className="drawer-link">Bracelets</div>
                <div className="drawer-link">Rings</div>
                <div className="drawer-link">Handbags</div>
                <div className="drawer-link">Contact Us For More</div>
              </div>
              <div id="valuable metals pricing" className="sidebar-drawer">
                <div className="drawer-title">Our Rates For The Day</div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <a className="drawer-link" href='https://goldprice.org/gold-price-usa.html' target='blank'>Gold: </a>
                  <div style={{fontSize: '20px'}}>63.67</div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div className="drawer-link" >Platinum: </div>
                  <div style={{fontSize: '20px'}}>31.40</div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div className="drawer-link" >Silver: </div>
                  <div style={{fontSize: '20px'}}>0.81</div>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar