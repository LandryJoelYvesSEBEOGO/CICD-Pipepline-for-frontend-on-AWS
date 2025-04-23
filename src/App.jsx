import { Routes, Route } from 'react-router-dom'
import Home from './Home'  // Move your current main content to Home.jsx
import AiAgent from './AiAgent'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-agent" element={<AiAgent />} />
      </Routes>
    </>
  )
}

export default App