import { useEffect, useState } from 'react'
import './App.css'
import './css/reset.css'
import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import ProductPage from './components/ProductPage'
import { app ,db } from './firebase'
import { getDocs, collection ,addDoc } from "firebase/firestore"; 

import axios from 'axios'

function App() {
  const test = ''

  async function getCollection(collectionName){
   try { const data = await getDocs(collection(db, 'rings')) //make a connection to that collection 
    console.log(data.docs)
    const filteredDocs  = data.docs.map((doc)=>({
        ...doc.data(),
        id: doc.id
      })) //to get only the documents form th3e given data
    console.log(filteredDocs)
    return filteredDocs
    }
    catch (err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getCollection('rings')
  },[])

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
      {/* <Home /> */}
      <ProductPage getCollection={getCollection}/>
      <Footer />
      <div className="background-blur" onClick={closeSidebar}/>
    </>
  )
}

export default App
