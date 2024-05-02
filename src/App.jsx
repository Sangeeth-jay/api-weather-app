import { useState } from 'react'
import './App.css'
import WeatherForm from './components/WeatherForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <WeatherForm/>
    </>
  )
}

export default App
