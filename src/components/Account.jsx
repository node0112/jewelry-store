import React, { useEffect } from 'react'

function Account({signUp, resetHomepage, signOut, signIn }) {

    function getInputs(type){ //type signifies the type of sign in that has been chosen 
        let email, password
        email = document.getElementById('email').value
        password = document.getElementById('password').value
        if(email.length > 0 && password.length > 0)
        {
            if(type == 'up')signUp(email,password)
            else signIn(email,password)
        }
    }
    useEffect(()=>{
        resetHomepage()
    }, [])
  return (
    <div style={{height: '100vh', marginTop: '20vh'}}>
        <label htmlFor="email" >Email:</label>
        <input type="email" id='email' min='7' />
        <label htmlFor="password">passoword</label>
        <input type="passowrd" minLength='5' id='password' />
        <button onClick={()=>{getInputs('up')}}>submit</button>
        <button onClick={signOut}>sign out</button>
        <button onClick={()=>{getInputs('in')}}>Sign In</button>
    </div>
  )
}

export default Account