import { useState } from 'react'
import './App.css'
import './css/reset.css'
import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'

function App() {
  function closeSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.left = '-500px'
    const blur = document.querySelector('.background-blur')
    blur.style.opacity = '0'
    setTimeout(() => {
      blur.style.zIndex = '-1'
    }, 500);
    document.querySelector('body').style.overflowY = 'auto'
  }
  return (
    <>
      <Header />
      <Sidebar closeSidebar={closeSidebar} />
      <Home />
      <Footer />
      <div className="background-blur" onClick={closeSidebar}/>
    </>
  )
}

export default App
