

import { signInWithPopup, signOut } from 'firebase/auth'
import React from 'react'
import { auth, provider } from '../config/firebaseAuth'
import { useDispatch, useSelector } from 'react-redux'
import { adduserData, removeUserData } from '../utils/authSlice'
import { toggleLogin } from '../utils/toggleslice'

const SigninBtn = () => {
    
    const userData = useSelector((state)=> state.authSlice.userData)

    const Dispatch = useDispatch()

    async function handleAuth() {
        let data = await signInWithPopup(auth, provider)


        const userdata = {
            name: data.user.displayName,
            photo: data.user.photoURL,
        }
        Dispatch(toggleLogin())

        Dispatch(adduserData(userdata));

    }
    async function handleLogout() {
        await signOut(auth)
        Dispatch(removeUserData())
        Dispatch(toggleLogin())
    
    }
    return (
        <>
          
         
           
           { 
            userData ?
             (<button onClick={handleLogout}  className="w-full text-2xl mt-5 p-5 bg-violet-500 text-white ">
                 Logout
            </button>) :
             (<button onClick={handleAuth}  className="w-full text-2xl mt-5 p-5 bg-violet-500 text-white ">
                 Login with Google
            </button>)}


        </>
    )
}

export default SigninBtn
