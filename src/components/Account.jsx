import React, { useEffect, useState } from 'react'
import '../css/account.css'
import Loader from './Loader'

function Account({signUp, resetHomepage, signOut, signIn, locUser, loading, ordersArray }) {

    const [noOrders,setNoOrders] = useState(true)
    const hero = 'https://firebasestorage.googleapis.com/v0/b/earhart-jewelry.appspot.com/o/images%2Facc-image.jpg?alt=media&token=8541699d-2c90-49ca-aa03-e7cbdaa74a0f'
    function getInputs(type){ //type signifies the type of sign in that has been chosen 
        let email, password
        email = document.getElementById('email').value
        password = document.getElementById('password').value
        if(email.length > 0 && password.length > 0)
        {
            if(type == 'up')signUp(email,password)
            else signIn(email,password)
        }
    }

    function rendersOrders(orders){ //follows same pattern as the cart array
        let count = 0
        orders.forEach(order => { //sub divisions are grouped together to avoid confusion
            count++
            const orderElem = document.createElement('div')
            orderElem.classList.add('order')
            if(count % 2 !== 0 && count!== 0){//makes every alternate order gray color
                orderElem.style.backgroundColor= '#D9D9D9'
            }

            const subDiv = document.createElement('div')
            subDiv.classList.add('flex')
            const orderImg = document.createElement('img')
            orderImg.src = order.image
            orderImg.classList.add("order-img")
            const detailsContainer = document.createElement('div')
            detailsContainer.classList.add('order-details-container')
            const detailsSubContainer =  document.createElement('div') //many sub containers for styling
            const orderName = document.createElement('div')
            orderName.classList.add('order-name')
            orderName.textContent = order.name
            const orderID = document.createElement('div')
            orderID.classList.add('order-id')
            orderID.textContent = '#' + order.id
            const orderDate = document.createElement('div')
            const dateFormatted = order.date.toDate().toDateString()
            orderDate.textContent = dateFormatted

            detailsSubContainer.appendChild(orderName)
            detailsSubContainer.appendChild(orderID)
            detailsContainer.appendChild(detailsSubContainer)
            detailsContainer.appendChild(orderDate)
            subDiv.appendChild(orderImg)
            subDiv.appendChild(detailsContainer)


            //price container
            const priceContainer = document.createElement('div')
            priceContainer.classList.add('price-container')
            const price = document.createElement('div')
            price.classList.add('price')
            price.textContent = '$' + order.price
            const paymentStat = document.createElement('div')
            paymentStat.classList.add('paid-status')
            paymentStat.textContent = order.paymentStatus
            
            priceContainer.appendChild(price)
            priceContainer.appendChild(paymentStat)

            orderElem.appendChild(subDiv)
            orderElem.appendChild(priceContainer)

            document.querySelector('.orders-container').appendChild(orderElem)
        });
    }
    useEffect(()=>{
        resetHomepage()
    }, [])
    useEffect(()=>{
        const header = document.querySelector('.header')
        const logosOg = document.querySelectorAll('.uninvert')
        const logosInverted = document.querySelectorAll('.invert')
        header.style.top = '0px'
        header.classList.add('header-open')
        logosOg.forEach(logo =>{
            logo.style.display = 'none'
        })
        logosInverted.forEach(logo =>{
            logo.style.display = 'block'
        })
        header.style.borderBottom = '1px solid black'
        return ()=>{
            header.style.borderBottom= 'none'
        }
    },[])
    useEffect(()=>{
        if(ordersArray.length > 0){
            setNoOrders(false)
            rendersOrders(ordersArray) //render orders if the length
        } 
        else setNoOrders(true)
    },[ordersArray])

  return (
        <div style={{minHeight: '80vh', marginTop: '20vh', gap: '50px', padding: 'var(--padding)'}} className='flex column'>
            <div className="product-title" style={{marginLeft: '0'}}> Account </div>
            {locUser ? 
            <div>
                 <Loader loading={loading}/>
                <div className="flex" style={{gap: '35px', alignItems: 'flex-end'}}>
                    <label  className='defont' style={{fontSize: '35px'}} >Email: </label>
                    <input type="email" minLength='5' id='email'  className='acc-inp' value={locUser.email}  disabled={true} style={{width: '200px'}} />
                    <button className='account-button styled-font' onClick={signOut}>Sign Out</button>
                </div>
                <div className="product-title" style={{marginLeft: '0', marginTop: '100px'}}> Orders </div>
                <div className="orders-container">
                    {noOrders ? <div id='no-orders' className='defont'>You Have No Previous Orders</div> : null}
                </div>
            </div> :  
            <div className='flex column' >
                <div>
                <Loader loading={loading}/>
                    <div className="flex account-input-container" >
                        <label htmlFor="email" className='defont' style={{fontSize: '35px'}} >Email:</label>
                        <input type="email" id='email'  className='acc-inp' min='7' style={{width: '200px'}} />
                    </div>
                    <div className="flex account-input-container" >
                        <label htmlFor="password" className='defont' style={{fontSize: '35px'}} >Password: </label>
                        <input type="password" minLength='5' id='password' className='acc-inp'  style={{width: '200px'}} />
                    </div>
                        <div className="flex" style={{gap: '30px'}}>
                            <button className='account-button styled-font' onClick={()=>{getInputs('up')}}>Sign Up</button>
                            <button className='account-button styled-font' onClick={()=>{getInputs('in')}}>Sign In</button>
                    </div>
                </div>
                <img src={hero} id='acc-hero' />
            </div> 
                }
            
        </div>
  )
}

export default Account