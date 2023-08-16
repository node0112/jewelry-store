import React, { useEffect, useState } from 'react'
import '../css/productpage.css'
import banner from '../assets/banner.png'

import closeLogo from '../assets/closecircle.svg'
import Loader from './Loader'


function ProductPage({getCollection, pageTitle, setProduct, addToCart, resetHomepage, loading, setLoading }) {

    //product view states
    const [price, setPrice] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [viewOpen, setViewOpen] = useState(false)



    async function renderProducts(){
        setLoading(true)
        const products = await getCollection()
        if(products !== 'err' ){ //check if there are produvts
            products.forEach(product =>{
                const card = document.createElement('div')
                const name = document.createElement('div')
                const image = document.createElement('img')
                const price = document.createElement('div')

                name.textContent = product.name
                name.classList.add('product-name')

                image.classList.add('product-image')
                image.src = product.image
                
                price.classList.add('product-price')
                price.textContent = "$"+product.price

                card.classList.add('product-card')
                card.appendChild(name)
                card.appendChild(price)
                card.appendChild(image)

                //add event listener so that cards can be clicked on for individual info
                card.addEventListener('click', ()=>{
                    renderView(product)
                })
                document.querySelector('.products-container').appendChild(card)
        })}
    }
    function removeCards(){
        const container = document.querySelector('.products-container')
        if(container.hasChildNodes){
            while(container.firstChild){
                container.removeChild(container.lastChild)
            }
        }
    }

    function renderView(product){ //sets the variables for the indivudal viewing of products and updates chosen product
        setPrice('$' + product.price)
        setName(product.name)
        setDescription(product.description)
        document.getElementById('product-view-image').src = product.image
        setProduct(product) //sets product id to  a variable so that it can be added to cart directly
        setViewOpen(true)
    }

    useEffect(()=>{ //incase gsap messes up the animation, this is the backup code
        resetHomepage()
    },[])

    useEffect(()=>{
        removeCards() //if user chagnes product page from the sidebar then remove curently loaded cards
        renderProducts()
    },[pageTitle])

    useEffect(() => {
        const view = document.querySelector('.product-view')
        if(viewOpen){
            view.style.top = '20%'
        }
        else{
            view.style.top = '120%'
        }
    }, [viewOpen])
    
    
  return (
    <div style={{width: '100vw'}}>
        <img src={banner} alt="Top Banner" className="top-banner" />
        <div className="flex column products-wrapper" >
            <div className="product-title"> {pageTitle} </div>
            <Loader loading={loading}/>
            <div className="products-container">
                <div className="product-card">
                 <div class="product-name">24K Gold</div><div class="product-price">$200</div><img class="product-image" src="" />
                </div>
                <div className="product-card">
                 <div class="product-name">24K Gold</div><div class="product-price">$200</div><img class="product-image" src="" />
                </div>
            </div>
        </div>
        <div className="product-view">
        <Loader loading={loading}/>
            <div className="flex view-container">
                <img src="" alt="product-image" id="product-view-image" />
                <div className="flex column" style={{gap: '15px'}}>
                    <div className="view-name style-font">{name}</div>
                    <div className="view-price defont">{price}</div>
                    <div className="view-description defont">{description}</div>
                    <div className="view-cart-button style-font" onClick={()=>{addToCart()}}>Add To Cart</div>
                    <img src={closeLogo} alt=""  id="view-close" className='cursor' onClick={()=>{setViewOpen(false)}}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductPage