import { useEffect, useState } from 'react'
import './App.css'
import './css/reset.css'
import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import ProductPage from './components/ProductPage'
import { db } from './firebase'
import { getDocs, collection, addDoc, setDoc, doc, updateDoc, arrayUnion, arrayRemove  } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";

import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Account from './components/Account'

function App() {

  const auth = getAuth()
  const navigate = useNavigate()

  const [pageTitle, setPageTitle] = useState('')
  const [collectionName, setCollectionName] = useState('')
  const [productId, setProductId] = useState('')
  const [locUser,setLocUser] = useState('')

  const [loading, setLoading] = useState(false)

  function signUp(email, password){
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      //create a cart document in the user collection for storing all items in cart
      setDoc(doc(db,'userCart', user.email), {
        cart: [],
        orders: {}
      })
      setLoading(false)
      navigate('/')
    })
    .catch((error) => {
      setLoading(false)
      const errorMessage = error.message;
      console.log(errorMessage)
    });
  }

  function signOutUser(){
    setLoading(true)
    signOut(auth).then(() => {
      console.log('signed-out')
      setLocUser(null)
      setLoading(false)
    }).catch((error) => {
      setLoading(false)
      const errorMessage = error.message
    });
  }

  function signIn(email, password){
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password).then(user =>{
      navigate('/')
      setLocUser(user)
      setLoading(false)
    }).catch(err =>{
      setLoading(false)
      console.log(err.message)
    })
  }

  useEffect(()=>{
    onAuthStateChanged(auth, (currentUser) => { //checks if user is signed in
      if(currentUser){
        setLocUser(currentUser)
      }
    });
  },[])
  
  async function addToCart(){
    if(locUser){
      const userDoc = doc(db, 'userCart', locUser.email) //find ref to the doc that we are adding the product id to 
      await updateDoc(userDoc, {
        cart: arrayUnion(productId) //array union function adds an item to the cart array without overwriting the whole document
      })
      console.log('done')
    }
    else{
      navigate('/account')
    }
  }

  async function removeFromCart(id){ //called from the cart preview box on the top of the screen
    const userDoc = doc(db, 'userCart', locUser.email) //find ref to the doc that we are adding the product id to 
    await updateDoc(userDoc, {
      cart: arrayRemove(id)
    })
  }

  async function getCart(){ //get all products added to the cart
    if(locUser){
      const userDoc = doc(db, 'userCart', user.email)
      const data = userDoc.data()
      console.log(data.cart)
    }
  }


  function resetHomepage(){ //ued to resize header and make subtext Appear on the homepage
    const logo = document.querySelector('.logo')
    logo.style.paddingTop = '0'
    logo.style.marginTop = '-6px'
    logo.style.fontSize = '50px'
    document.querySelector('.logo-subtext').style.opacity = '0'
    }

  

  async function getCollection(){
  if(collectionName){
      try { const data = await getDocs(collection(db, collectionName)) //make a connection to that collection 
      const filteredDocs  = data.docs.map((doc)=>({
          ...doc.data(),
          id: doc.id
        })) //to get only the documents form th3e given data
        setLoading(false)
        return filteredDocs
      }
      catch (err){
        setLoading(false)
        console.log(err)
      }
    }
    else{
      setLoading(false)
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

  return(
    <>
        <Header removeFromCart={ removeFromCart } loading={loading} setLoading={setLoading}/>
        <Sidebar closeSidebar={closeSidebar} setPageTitle={setPageTitle} setCollectionName={setCollectionName}  />
        <Routes>
          <Route path='/' element={<Home loading={loading} setLoading={setLoading} />} />
          <Route path='/products' element={<ProductPage getCollection={getCollection} resetHomepage={resetHomepage} pageTitle={pageTitle} setProductId={setProductId} addToCart={addToCart} loading={loading} setLoading={setLoading} />  }/>
          <Route path='/account' element={<Account signUp={signUp} resetHomepage={resetHomepage} signOut={signOutUser} signIn={signIn} locUser={locUser} loading={loading} setLoading={setLoading} />} />
        </Routes>
        <div className="background-blur" onClick={closeSidebar}/>
        <Footer />
    </>
  )
  }

export default App
