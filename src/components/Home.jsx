import React, { useEffect, useState } from 'react'
import bgVideo  from '../assets/bgVid.mp4'
import '../css/home.css'
import arrow from '../assets/arrow.svg'
import earrings from '../assets/images/earrings.jpg'
import bracelets from '../assets/images/bracelets.jpg'

function  Home() {

  const [sliderPos, setSliderPos] = useState(0) 
  const [barCount, setbarCount] = useState(0)
  const [barPosition, setBarPosition] = useState('')
  const [cardID, setCardID] = useState(1) //used to make other cards not in view have a opacity of 0.5
  const [currMargin, setCurrMargin] = useState(0)



  async function slide(action){
    document.querySelector('.card-in-view').classList.remove('card-in-view') //make current card slightly less opaque

    if(action === 'right'){
      setCardID(cardID => cardID + 1)
      setCurrMargin(currMargin => currMargin + 132.5 )
      setSliderPos((sliderPos)=> sliderPos + 613)
    }
    
    else if(action === 'left'){
      setCardID(cardID => cardID - 1)
      setSliderPos((sliderPos)=> sliderPos - 613)
      setCurrMargin(currMargin => currMargin - 132.5 )
    }
  }
  
  useEffect(()=>{
    document.getElementById(cardID.toString()).classList.add('card-in-view') //add opacity to new card
  },[cardID])

  useEffect(()=>{ //add effect to the document during intial load
    const smallCards = document.querySelectorAll('.home-card-small')
    smallCards.forEach(card =>{
      card.addEventListener('mouseover', ()=>{ //used for hover effect
        card.querySelector('.card-info').style.marginBottom = '0'
        card.querySelector('.card-info').style.opacity = '1'
      })
      card.addEventListener('mouseout', ()=>{
        card.querySelector('.card-info').style.marginBottom = '-50px'
        card.querySelector('.card-info').style.opacity = '0'
      })
    })
  },[])



  return (
    <div className='home-container'>
        <div className="vid-bg"> 
            <video src={bgVideo} autoPlay={true} loop={true} muted={true} style={{width: '100vw', height: '100vh', objectFit: 'cover'}}/>
            <div className="home-main-text">Jewelry For Everyone</div>
            <div className="overlay"></div>
        </div>
        <section className='home-section flex padding' style={{marginTop: '100vh',justifyContent: 'space-evenly'}}>
          <div className="home-card flex">
            <div className="cta-container">
              <div className="cta-info" style={{color: 'white'}}>Necklaces For Her</div>
              <div className="cta-button cursor" id='cta1'>Explore Collection</div>
            </div>
          </div>
          <div className="home-card flex ">
            <div className="cta-container">
              <div className="cta-info">For Someone Special,</div>
              <div className="cta-button cursor" id='cta2'>Send a gift</div>
            </div>
          </div>
        </section>
        <section className="home-section padding flex vertical column" style={{justifyContent: 'space-evenly'}}>
          <div className="section-title">Bring The Glamour Home</div>
          <div className="cards-slideshow flex column vertical">
            <div className="cards-wrapper">
              <div className="home-cards-small-container flex vertical" style={{transform:'translateX(-' + sliderPos + 'px)'}} >
                <div className="home-card-small cursor card-in-view" id='1' >
                  <div className="gradient" />
                  <img src={earrings} alt="earrings" className="card-bg" />
                  <div className="card-title">Rings and earrings</div>
                  <div className="card-info">For Him and Her, made with love and passion from our master craftmen & craftwomen</div>
                </div>
                <span className="sep-line" />
                <div className="home-card-small cursor" id='2'>
                  <div className="gradient" />
                  <img src={bracelets} alt="bracelets" className="card-bg" />
                  <div className="card-title">Bracelets</div>
                  <div className="card-info">A perfect fit for your wrist available in the most exquisite of metals known to mankind</div>
                </div>
                <span className="sep-line" />
                <div className="home-card-small cursor" id='3'>
                  <div className="gradient" />
                  <img src={earrings} alt="" className="card-bg" />
                  <div className="card-title">Rings and earrings</div>
                  <div className="card-info">For Him and Her, made with love and passion from our master craftmen & craftwomen</div>
                </div>
                <span className="sep-line" />
                <div className="home-card-small cursor" id='4'>
                  <img src="" alt="" className="card-bg" />
                  <div className="gradient" />
                  <div className="card-link"></div>
                  <div className="card-info"></div>
                </div>
              </div>
            </div>
            <div className="slideshow-info-container flex vertical horizontal" style={{width:'610px'}}>
            { sliderPos > 0 ? <img src={arrow} style={{transform: 'rotate(180deg)'}} className="slide-left cursor" onClick={()=>{slide('left')}} /> : <div style={{width: '38px', backgroundColor: 'transparent'}} /> }
              <div className="slide-pos">
                <div className="slider-bar" style={{marginLeft: currMargin + 'px'}}/>
              </div>
             { sliderPos < 1500 ? <img src={arrow} className="slide-right cursor" onClick={()=>{slide('right')}} /> : <div style={{width: '38px', backgroundColor: 'transparent'}} />}
            </div>
          </div>
        </section>
        <section className="home-section padding flex vertical column" style={{height: '350px', marginBottom: '245px'}}>
          <div className="section-title">Book an appointment</div>
          <div className="defont" style={{textAlign: 'center',fontSize: '30px', color: 'var(--gray)', maxWidth: '878px', marginBottom: '35px'}}>Visit us at one our boutiques and shop or customize your jewelry with one of our own personal advisors.</div>
          <div className="sidebar-link style-font" style={{fontSize: '35px'}}>View Available Slots</div>
        </section>
    </div>
  )
}

export default  Home