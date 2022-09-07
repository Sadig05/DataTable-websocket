import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import MyTable from "./components/MyTable"
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <MyTable/>
    </div>
  )
}

export default App
