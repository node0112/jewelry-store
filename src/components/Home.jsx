import React from 'react'
import bgVideo  from '../assets/bgVid.mp4'
import '../css/home.css'

function    Home() {
  return (
    <div className='home-container'>
        <div className="vid-bg"> 
            <video src={bgVideo} autoPlay='true' loop='true' muted='true' style={{width: '100vw', height: '100vh', objectFit: 'cover'}}/>
            <div className="overlay"></div>
        </div>
    </div>
  )
}

export default  Home