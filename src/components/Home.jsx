import React, { useEffect, useState } from 'react'
import bgVideo  from '../assets/bgVid.mp4'
import '../css/home.css'
import arrow from '../assets/arrow.svg'

function  Home() {

  const [sliderPos, setSliderPos] = useState(0) 
  const [cardID, setCardID] = useState(1) //used to make other cards not in view have a opacity of 0.5
  const [currMargin, setCurrMargin] = useState(0)

  //image links
  const bracelets = 'https://firebasestorage.googleapis.com/v0/b/earhart-jewelry.appspot.com/o/images%2Fbracelets.jpg?alt=media&token=e641e5d5-e4e7-450c-984d-52510afebdf3'
  const earrings = 'https://firebasestorage.googleapis.com/v0/b/earhart-jewelry.appspot.com/o/images%2Fearrings.jpg?alt=media&token=03f7f8f3-18e1-4167-bdb9-fb1796625573'
  const necklaceHero = 'https://firebasestorage.googleapis.com/v0/b/earhart-jewelry.appspot.com/o/images%2Fnecklace.jpg?alt=media&token=4efc6639-ca31-44ed-9cd3-ab04a5afc016'
  const giftHero = 'https://firebasestorage.googleapis.com/v0/b/earhart-jewelry.appspot.com/o/images%2Fgifts.jpg?alt=media&token=eac4f1cd-132a-454a-89fd-9ac2b2bb82c3'

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
    //show home text if header animation is complete
    const logoSubText = document.querySelector('.logo-subtext')
    if(logoSubText.style.opacity == '0') document.querySelector('.home-main-text').style.opacity = '1'


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
            <img src={necklaceHero} className='home-hero-image' alt="" />
            <div className="cta-container">
              <div className="cta-info" >Necklaces For Her</div>
              <div className="cta-button cursor" id='cta1'>Explore Collection</div>
            </div>
          </div>
          <div className="home-card flex ">
            <img src={giftHero} className='home-hero-image' alt="" />
            <div className="cta-container">
              <div className="cta-info" style={{color: 'white'}}>For Someone Special,</div>
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