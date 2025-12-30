
import './App.css';

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import News from './components/News';
import About from './components/About';

const App=()=>{
    return (
      <div>
        <NavBar/>
        <Routes>
          <Route path="/" element={<News pageSize={6} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    )
  }
 export default App;