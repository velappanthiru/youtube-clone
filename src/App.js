import React, { useEffect } from 'react'
import { Routes, Route } from "react-router-dom";

import { Home, WatchScreen, SearchScreen, ChannelScreen } from "./route";
import Login from './pages/login';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const App = () => {
  const { accessToken, loading } = useSelector(state => state?.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !accessToken) {
      navigate('/auth');
    }
  },[accessToken,loading,navigate])
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Home />} /> {/* 👈 Renders at /app/ */}
        <Route path="/auth" element={<Login />} />
        <Route path="/watch/:id" element={<WatchScreen />} />
        <Route path="/search/:query" element={<SearchScreen />} />
        <Route path="/channel/:id" element={<ChannelScreen />} />
        <Route path='*' element={<Home />}/>
      </Routes>
    </div>
  )
}

export default App
