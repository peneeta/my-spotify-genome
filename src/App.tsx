import { useEffect, useState } from 'react'
import { redirectToAuthCodeFlow, getRefreshToken, getAccessToken } from "./scripts/authCodePkce";
import './App.css'

import Login from './components/Login'

// API Constants
const clientId = 'e3dc42cfeb2b4fb0bb03369b39d757e5'

function App() {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    getAccessToken(clientId)
    
  }, [])



  return (
    <>
        <Login />
    </>
  )
}

export default App
