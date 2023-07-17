import React, { useEffect, useState } from 'react'
import bgVideo  from '../assets/bgVid.mp4'
import '../css/home.css'
import arrow from '../assets/arrow.svg'

function  Home() {

  const [sliderPos, setSliderPos] = useState(0) 
  const [barCount, setbarCount] = useState(0)
  const [barPosition, setBarPosition] = useState('')
  const [currMargin, setCurrMargin] = useState(0)



  async function slide(action){
    const barPosMargin = document.querySelector('.slider-bar').style
    if(action === 'right'){
      setCurrMargin(currMargin => currMargin + 132.5 )
      setSliderPos((sliderPos)=> sliderPos + 500)
    }
    else if(action === 'left'){
      setSliderPos((sliderPos)=> sliderPos - 500)
      setCurrMargin(currMargin => currMargin - 132.5 )
    }
  }
  useEffect(()=>{
    console.log(sliderPos)
  }, [sliderPos])
  return (
    <div className='home-container'>
        <div className="vid-bg"> 
            <video src={bgVideo} autoPlay={true} loop={true} muted={true} style={{width: '100vw', height: '100vh', objectFit: 'cover'}}/>
            <div className="overlay"></div>
        </div>
        <section className='home-section flex padding' style={{marginTop: '100vh'}}>
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
              <div className="home-cards-small-container flex" style={{transform:'translateX(-' + sliderPos + 'px)'}} >
                <div className="home-card-small">
                  <img src="" alt="" className="card-bg" />
                  <div className="card-link"></div>
                  <div className="card-info"></div>
                </div>
                <div className="home-card-small">
                </div>
                <div className="home-card-small">
                </div>
                <div className="home-card-small">
                  <img src="" alt="" className="card-bg" />
                  <div className="card-link"></div>
                  <div className="card-info"></div>
                </div>
              </div>
            </div>
            <div className="slideshow-info-container flex vertical">
            { sliderPos > 0 ? <img src={arrow} style={{transform: 'rotate(180deg)'}} className="slide-left" onClick={()=>{slide('left')}} /> : null }
              <div className="slide-pos">
                <div className="slider-bar" style={{marginLeft: currMargin + 'px'}}/>
              </div>
             { sliderPos < 1500 ? <img src={arrow} className="slide-right" onClick={()=>{slide('right')}} /> : null}
            </div>
          </div>
        </section>
    </div>
  )
}

export default  Home