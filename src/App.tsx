// import { useEffect, useState } from 'react'
// import { getAccessToken } from "./scripts/authCodePkce";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import Login from './components/Login'
import Authorization from './components/Authorization';
import Callback from './components/Callback';


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authorization />} />
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </BrowserRouter>
    </div>


  )
}

export default App
