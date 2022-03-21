import { useState } from 'react'
import './App.scss'
import bgMac from './images/bg-mac.webp';
import bgMacShadow from './images/shadow.webp';
import bgMacRefl from './images/refl.webp';
import { Desktop } from './Desktop/Desktop'

function App() {
  const [count, setCount] = useState(0)
  const style = {
    backgroundImage: `url(${bgMac})`,
  }

  return (
    <div className="app" style={style}>
      <img className="screen-overlay screen-overlay--refl" src={bgMacRefl} alt="" />
      <img className="screen-overlay screen-overlay--shadow" src={bgMacShadow} alt="" />
      <Desktop />
    </div>
  )
}

export default App
