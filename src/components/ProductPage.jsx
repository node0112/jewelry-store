import React, { useEffect } from 'react'
import '../css/productpage.css'
import banner from '../assets/banner.png'

function ProductPage({getCollection, collectionName, pageTitle}) {

    async function renderProducts(){
        const products = await getCollection('rings')
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

            document.querySelector('.products-container').appendChild(card)
        })
    }
    useEffect(()=>{ //incase gsap messes up the animation, this is the backup code
        const logo = document.querySelector('.logo')
        logo.style.paddingTop = '0'
        logo.style.marginTop = '-6px'
        logo.style.fontSize = '50px'
        document.querySelector('.logo-subtext').style.opacity = '0'
        renderProducts()
    },[])
  return (
    <div style={{width: '100vw'}}>
        <img src={banner} alt="Top Banner" className="top-banner" />
        <div className="flex column products-wrapper" >
            <div className="product-title">Rings And Earrings</div>
            <div className="products-container">
            </div>
        </div>
    </div>
  )
}

export default ProductPage