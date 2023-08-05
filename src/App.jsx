import { useEffect, useState } from 'react'
import './App.css'
import './css/reset.css'
import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import ProductPage from './components/ProductPage'
import { db } from './firebase'
import { getDocs, collection, addDoc, setDoc, doc  } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Account from './components/Account'

function App() {

  const auth = getAuth()

  function signUp(email, password){
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      //add a cart document in the user collection
      setDoc(doc(db,'userCart', user.email), {
        cart: []
      })
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage)
    });
  }

  function signOutUser(){
    signOut(auth).then(() => {
      console.log('signed-out')
    }).catch((error) => {
      const errorMessage = error.message
    });
  }

  function signIn(email, password){
    signInWithEmailAndPassword(auth, email, password).then(user =>{
      console.log(user)
    }).catch(err =>{
      console.log(err.message)
    })
  }
  
  onAuthStateChanged(auth, (user) => { //checks for active users
    if (user) {
      console.log(user.email)
      const uid = user.uid;
      // ...
    } else {
      console.log('signed-out')
    }
  });

  function resetHomepage(){ //ued to resize header and make subtext Appear on the homepage
    const logo = document.querySelector('.logo')
    logo.style.paddingTop = '0'
    logo.style.marginTop = '-6px'
    logo.style.fontSize = '50px'
    document.querySelector('.logo-subtext').style.opacity = '0'
    }

  const [pageTitle, setPageTitle] = useState('')
  const [collectionName, setCollectionName] = useState('')

  async function getCollection(){
  if(collectionName){
      try { const data = await getDocs(collection(db, collectionName)) //make a connection to that collection 
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
    else{
      return 'err'
    }
  }

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
    <BrowserRouter>
      <Header />
      <Sidebar closeSidebar={closeSidebar} setPageTitle={setPageTitle} setCollectionName={setCollectionName} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductPage getCollection={getCollection} resetHomepage={resetHomepage} pageTitle={pageTitle}/>  }/>
        <Route path='/account' element={<Account signUp={signUp} resetHomepage={resetHomepage} signOut={signOut} signIn={signIn} />} />
      </Routes>
      <div className="background-blur" onClick={closeSidebar}/>
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
