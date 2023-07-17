import React from 'react'
import bgVideo  from '../assets/bgVid.mp4'
import '../css/home.css'

function    Home() {
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
              <div className="home-cards-small-container flex">
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
                </div>
              </div>
            </div>
            <div className="slideshow-info-container">
              <div className="slide-left"></div>
              <div className="slide-pos">
                <div className="slider-bar" />
              </div>
              <div className="slide-right"></div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default  Home