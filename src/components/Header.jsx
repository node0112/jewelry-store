import React, { useState,useEffect } from 'react'
import useDetectScroll from "@smakss/react-scroll-direction";
import '../css/header.css'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

//assets
import menu from '../assets/menu.svg'
import menuInvert from '../assets/menu-invert.svg'
import cart from '../assets/cart.svg'
import cartInvert from '../assets/cart-invert.svg'
import search from '../assets/search.svg'
import searchInvert from '../assets/search-invert.svg'
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate()
  gsap.registerPlugin(ScrollTrigger)

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

  useEffect(() => {
    const body = document.querySelector('body')
    body.addEventListener('scroll', data =>{
      console.log('data')
    })
  }, [])

  function openSidebar(){
    const sidebar = document.querySelector('.sidebar')
    const blur = document.querySelector('.background-blur')
    blur.style.zIndex = '998'
    blur.style.opacity = '1'
    sidebar.style.left = '0px'
    document.querySelector('body').style.overflowY = 'hidden'
  }
  const scrollDir = useDetectScroll({
    thr: 70,
    axis: 'y'
  });


  useEffect(() => { //hide and show header
    const header = document.querySelector('.header')
    const logosOg = document.querySelectorAll('.uninvert')
    const logosInverted = document.querySelectorAll('.invert')
    if(scrollDir === 'up'){
      header.style.top = '0px'
      header.classList.add('header-open')
      logosOg.forEach(logo =>{
        logo.style.display = 'none'
      })
      logosInverted.forEach(logo =>{
        logo.style.display = 'block'
      })
    }
    else{
      header.style.top = '-200px'
      header.classList.remove('header-open')
    }
  }, [scrollDir])

  useEffect(() => {
    const timeline = new gsap.timeline()
    document.querySelector('.header').style.top = '0px'

    //aniamte logo to fit header
    timeline.to('.logo',{
      paddingTop : '0',
      marginTop : '-6px',
      fontSize: '50px',
      scrollTrigger: {
        trigger: '.vid-bg',
        start: 'top top',
        end: 'bottom 50%',
      }
    })
    .to('.logo-subtext',{
      opacity : '0',
      scrollTrigger: {
        trigger: '.vid-bg',
        start: 'top top',
        end: 'bottom 50%',
      }
    })
    .to('.home-main-text',{
      opacity : '1',
      scrollTrigger: {
        trigger: '.vid-bg',
        start: 'top top',
        end: 'bottom 50%',
      }
    })

    //turn header back to orginial state on the top of the page
    window.addEventListener("scroll", function(){
      if(window.scrollY==0){
        const logosOg = document.querySelectorAll('.uninvert')
        const logosInverted = document.querySelectorAll('.invert')
        document.querySelector('.header').classList.remove('header-open')

        logosOg.forEach(logo =>{ //change logos back to white
          logo.style.display = 'block'
        })
        logosInverted.forEach(logo =>{
          logo.style.display = 'none'
        })
      }
    });
  }, [])
  
  
  
  return (
    <div className='header flex'>
      <div className="left-header-nav header-nav flex">
        <img src={menu} alt="menu" className="uninvert cursor"  id='menu' onClick={openSidebar} />
        <img src={menuInvert} alt="menu" className="invert cursor"  id='menu' onClick={openSidebar} />
      </div>
      <div className="logo" onClick={()=>{navigate('/')}} >Earhart
      <div className="logo-subtext">
        Wear Your Shine</div></div>
      <div className="right-header-nav header-nav flex">
      <div className="flex" style={{gap: '10px', width: '30px'}}>
          <img className="nav-link flex cursor uninvert" id="cart" src={cart} />
          <div className="cart-container">
            <div className="cart-product">
              <img src="" alt="" className="cart-prod-img" />
              <div className="flex column">
                <div className="cart-prod-name">4Big Guys</div>
                <div className="cart-prod-price">$225</div>
                <button className="remove-button">Remove</button>
              </div>
            </div>
          </div>
          <img className=" cursor invert"  src={cartInvert} />
        </div>
        <div className="flex" id='searchCont' style={{gap: '10px', width: '30px'}}>
          <img className="nav-link flex cursor uninvert" onClick={searchAnimate} src={search} />
          <img className=" cursor invert" onClick={searchAnimate} src={searchInvert} />
          <input type="text" id='searchbar'/>
        </div>
      </div>
    </div>
  )
}

export default Header               