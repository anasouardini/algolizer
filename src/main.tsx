import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SharedLayout from './components/sharedLayout';
import Charts from './pages/charts';
import Ranking from './pages/ranking';

import algoTester from './algos/index';

// algoTester()

const MyRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Ranking />} />
      <Route path='/ranking' element={<Ranking />} />
      <Route path='/charts' element={<Charts />} />
    </Routes>
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <MyRouter/>
)
