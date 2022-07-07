import React, {useContext,useEffect,useState} from 'react'
import { auth } from "../firebase"

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export  function AuthProvider({children}) {
const [currentUser,setCurrentUser] = useState()
const [loading,setLoading] = useState(true)

    function Signin(email,password){
        return auth.signInWithEmailAndPassword(email,password)
    }

    function Logout(){
        return auth.signOut()
    }

    const value ={
        currentUser,
        Signin,
        Logout
    }

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    },[])


  return (
    <AuthContext.Provider value={value}>
        {!loading &&children}
    </AuthContext.Provider>
  )
}
