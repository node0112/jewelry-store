import { useEffect, useState } from 'react'
import './App.css'
import './css/reset.css'
import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import ProductPage from './components/ProductPage'
import { db } from './firebase'
import { getDocs, collection, addDoc, setDoc, doc, updateDoc, arrayUnion, arrayRemove, getDoc, orderBy  } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";

import {  Routes, Route, useNavigate } from 'react-router-dom'
import Account from './components/Account'

function App() {

  const auth = getAuth()
  const navigate = useNavigate()

  const [pageTitle, setPageTitle] = useState('')
  const [collectionName, setCollectionName] = useState('')
  const [product, setProduct] = useState('')
  const [locUser,setLocUser] = useState('')
  const [cartArray, setCartArray] = useState([])
  const [ordersArray, setOrdersArray] = useState([])

  const [loading, setLoading] = useState(false)

  function signUp(email, password){
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      //create a cart document in the user collection for storing all items in cart
      setDoc(doc(db,'userCart', user.email), {
        cart: [],
        orders: []
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
      console.log(product)
      await updateDoc(userDoc, {
        cart: arrayUnion(product) //array union function adds an item to the cart array without overwriting the whole document
      })
      console.log('done')
      getCart()//updates cart locally 
    }
    else{
      navigate('/account')
    }
  }

  async function removeFromCart(id){ //called from the cart preview box on the top of the screen
    let cartArrayCopy = cartArray
    if(locUser){
      let loc = 0
      cartArrayCopy.forEach(product =>{
        if(product.id === id) return; 
        loc ++
      })
      cartArrayCopy.splice(loc, 1) //remove element from local array
      setCartArray(cartArrayCopy) //update local array
      const userDoc = await doc(db, 'userCart', locUser.email) //find ref to the doc that we are adding the product id to 
      await updateDoc(userDoc, {
        cart: cartArrayCopy
      })
      getCart()//show changes in cart locally
    }
  }

  async function getCart(){ //get all products added to the cart as well as orders as they are in the same response
    if(locUser){ //secondary check
      const userDoc = await  getDoc(doc(db, 'userCart', locUser.email))
      const data = userDoc.data()
      if(data.cart) setCartArray(data.cart)
      if(data.orders) setOrdersArray(data.orders)
    }
  }

  async function purchaseItems(){
    setLoading(true)
    //update orders array and then show order screen 
    const docRef = doc(db, 'userCart', locUser.email)
    const userDoc =  await  getDoc(docRef) //find ref to the doc that we are adding the product id to 
    const data = userDoc.data()
    let preExistingOrders = data.orders //this will be concanted using the current cart array
    const localOrdersArray = (cartArray) //to add all items from the cart to the local order array 
    localOrdersArray.forEach(order =>{ //add a date to each one of the orders in the local array 
      const newDate = new Date()
      order.date = newDate //add date field to the object 
    })
    console.log(preExistingOrders)
    console.log(localOrdersArray)
    preExistingOrders = preExistingOrders.concat(localOrdersArray) //add all cart items into array, this will be done in after payment after payment in the real world 
    console.log(preExistingOrders)
    await setDoc(docRef, {
      cart: [], //the cart array is emptied to impy the succes of an order
      orders: preExistingOrders
    }).then(()=>{
      setLoading(false)
      //animation
      const successContainer = document.querySelector('.success-container')
      const logo = document.getElementById('success-logo')
      successContainer.style.zIndex = '9'
      successContainer.style.opacity = '1'
      logo.classList.add("success-animation")
      setTimeout(() => {
        getCart()//updates cart locally to match the emptied cart
      }, 1000);
      setTimeout(() => {
        successContainer.style.opacity = '0'
        setTimeout(() => {
          successContainer.style.zIndex = '-1'
        }, 500); //another timeout for opacity animation
        logo.classList.remove("success-animation")
      }, 3000);
      //animation end
    }).catch(err =>{
      setLoading(false)
      console.log(err)
    })
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
        })) //to get only the documents form the given data
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

  useEffect(()=>{//gets current cart of the use if logged in
    if(locUser) getCart()
  }, [locUser])

  

  return(
    <>
        <Header removeFromCart={ removeFromCart } loading={loading} cartArray={cartArray} purchaseItems={purchaseItems} />
        <Sidebar closeSidebar={closeSidebar} setPageTitle={setPageTitle} setCollectionName={setCollectionName}  />
        <Routes>
          <Route path='/' element={<Home loading={loading} setLoading={setLoading} />} />
          <Route path='/products' element={<ProductPage getCollection={getCollection} resetHomepage={resetHomepage} pageTitle={pageTitle} setProduct={setProduct} addToCart={addToCart} loading={loading} setLoading={setLoading} />  }/>
          <Route path='/account' element={<Account signUp={signUp} resetHomepage={resetHomepage} signOut={signOutUser} signIn={signIn} locUser={locUser} loading={loading} setLoading={setLoading}  ordersArray={ordersArray} />} />
        </Routes>
        <div className="background-blur" onClick={closeSidebar}/>
        <Footer />
    </>
  )
  }

export default App
