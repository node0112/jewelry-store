import React, { useState, useEffect } from 'react'
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
import closeLogo from '../assets/closecircle.svg'
import { useNavigate } from 'react-router-dom';

function Header({removeFromCart, cartArray}) {
  const navigate = useNavigate()
  gsap.registerPlugin(ScrollTrigger)


  const [searchOpen, setSearchOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  async function searchAnimate() {
    const searchInput = document.getElementById('searchbar')
    const searchCont = document.getElementById('searchCont').style
    if (searchOpen) {
      searchCont.width = '30px'
      searchInput.style.width = '0%'
      setSearchOpen(searchOpen => !searchOpen)
    }
    else {
      searchCont.width = '200px'
      searchInput.style.width = '100%'
      searchInput.select()
      setSearchOpen(searchOpen => !searchOpen)
    }
  }


  function openSidebar() {
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

  async function handleCartArray() { //render products from the array to the cart container
   
    if(cartArray.length > 0){
      cartArray.forEach(product => {
        renderCartProducts(product)
      })
      handleCartPress() //opens the cart container to show that it has ben updated
    }
  }

  function renderCartProducts(product) { //generated w chat gpt but I revised and updated the code
    // Create div element with className "cart-product"
    const cartProduct = document.createElement('div');
    cartProduct.className = 'cart-product';

    // Create img element for product image
    const img1 = document.createElement('img');
    img1.src = product.image;
    img1.alt = 'Product Image';
    img1.className = 'cart-prod-img';

    // Create div element with className "prod-info flex column"
    const prodInfo = document.createElement('div');
    prodInfo.className = 'prod-info flex column';

    // Create div element for product name
    const prodName = document.createElement('div');
    prodName.className = 'cart-prod-name';
    prodName.textContent = product.name

    // Create div element for product price
    const prodPrice = document.createElement('div');
    prodPrice.className = 'cart-prod-price';
    prodPrice.textContent = product.price;

    // Append product name and price to prodInfo
    prodInfo.appendChild(prodName);
    prodInfo.appendChild(prodPrice);

    // Create img element for remove button
    const img2 = document.createElement('img');
    img2.src = closeLogo;
    img2.className = 'remove-button';
    img2.alt = '';
    img2.addEventListener('click', ()=>{
      removeFromCart(product.id)
    })
    // Append all created elements to cartProduct
    cartProduct.appendChild(img1);
    cartProduct.appendChild(prodInfo);
    cartProduct.appendChild(img2);

    // Append cartProduct to the desired location in the DOM
    document.querySelector('.cart-products-container').appendChild(cartProduct);

  }

  function handleCartPress(){
    if(cartArray.length > 0) setCartOpen(!cartOpen);
        //else navigate('/account')
  }

  useEffect(() => { //hide and show header
    const header = document.querySelector('.header')
    const logosOg = document.querySelectorAll('.uninvert')
    const logosInverted = document.querySelectorAll('.invert')

    if (scrollDir === 'up') { //header has been scrolled into view
      header.style.top = '0px'
      header.classList.add('header-open')
      logosOg.forEach(logo => {
        logo.style.display = 'none'
      })
      logosInverted.forEach(logo => {
        logo.style.display = 'block'
      })
    }
    else { //header has been closed
      header.style.top = '-200px'
      header.classList.remove('header-open')
      setCartOpen(false)
    }
  }, [scrollDir])

  useEffect(() => { //handles cart openuing and closing
    console.log(cartOpen)
    const cartContainer = document.querySelector('.cart-container')
    if (cartOpen) {
      cartContainer.classList.remove('close-animation')
    }
    else if(!cartOpen){
      cartContainer.classList.add('close-animation')
    }
  }, [cartOpen])

  useEffect(() => {
    const timeline = new gsap.timeline()
    document.querySelector('.header').style.top = '0px'

    //aniamte logo to fit header
    timeline.to('.logo', {
      paddingTop: '0',
      marginTop: '-6px',
      fontSize: '50px',
      scrollTrigger: {
        trigger: '.vid-bg',
        start: 'top top',
        end: 'bottom 50%',
      }
    })
      .to('.logo-subtext', {
        opacity: '0',
        scrollTrigger: {
          trigger: '.vid-bg',
          start: 'top top',
          end: 'bottom 50%',
        }
      })
      .to('.home-main-text', {
        opacity: '1',
        scrollTrigger: {
          trigger: '.vid-bg',
          start: 'top top',
          end: 'bottom 50%',
        }
      })

    //turn header back to orginial state on the top of the page
    window.addEventListener("scroll", function () {
      if (window.scrollY == 0) {
        const logosOg = document.querySelectorAll('.uninvert')
        const logosInverted = document.querySelectorAll('.invert')
        document.querySelector('.header').classList.remove('header-open')

        logosOg.forEach(logo => { //change logos back to white
          logo.style.display = 'block'
        })
        logosInverted.forEach(logo => {
          logo.style.display = 'none'
        })
      }
    });

  }, [])

  useEffect(()=>{ //renders cart when the user signs in and the array is recieved 
    console.log(cartArray)
    handleCartArray()
  },[cartArray])


  return (
    <div className='header flex'>
      <div className="left-header-nav header-nav flex">
        <img src={menu} alt="menu" className="uninvert cursor" id='menu' onClick={openSidebar} />
        <img src={menuInvert} alt="menu" className="invert cursor" id='menu' onClick={openSidebar} />
      </div>
      <div className="logo" onClick={() => { navigate('/') }} >Earhart
        <div className="logo-subtext">
          Wear Your Shine</div></div>
      <div className="right-header-nav header-nav flex">
        <div className="flex" style={{ gap: '10px', width: '30px' }}>
          <img className="nav-link flex cursor uninvert cart" id="cart" src={cart} onClick={handleCartPress}/>
         <div className="cart-container flex column">
          <div className="cart-products-container flex column"></div> 
            <div className="purchase-button cursor">Purchase</div>
          </div> 
          <img className="cart cursor invert" src={cartInvert} onClick={handleCartPress} />
        </div>
        <div className="flex" id='searchCont' style={{ gap: '10px', width: '30px' }}>
          <img className="nav-link flex cursor uninvert" onClick={searchAnimate} src={search} />
          <img className=" cursor invert" onClick={searchAnimate} src={searchInvert} />
          <input type="text" id='searchbar' />
        </div>
      </div>
    </div>
  )
}

export default Header               