import React from 'react';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/navbar';
import Landing from './pages/landing';
import Login from './pages/login';
import Register from './pages/Register';
import GameLevels from './pages/levelselect';
import GameBoard from './pages/gameboard';
import Leaderboard from './pages/leaderboard';
import './styles/App.css';
import HowToPlay from './pages/howtoplay';

const App = () => {

  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Landing />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="game-levels" element={<GameLevels/>}/>
      <Route path="/game/:level" element={<GameBoard/>}/>
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/howToPlay" element={<HowToPlay />} />
      </Routes>
    </Router>
    //<h1>hello world</h1>
  );
}

export default App
