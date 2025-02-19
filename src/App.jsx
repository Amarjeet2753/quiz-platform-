import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Quiz from './components/Quiz.jsx'
import { quizData } from './data/QuizData.jsx'
import Home from './components/Home.jsx';

function App() {
  
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz quizData={quizData} />} />
    </Routes>
  </Router>
  )
}

export default App
