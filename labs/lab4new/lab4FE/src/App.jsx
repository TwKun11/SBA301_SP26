import './App.css'
import { Routes, Route } from 'react-router-dom'
import ListOfOrchids from './components/ListOfOrchids.jsx'
import EditOrchid from './components/EditOrchid.jsx'
import NavBar from './components/NavBar.jsx'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<ListOfOrchids />} />
        <Route path="/edit/:id" element={<EditOrchid />} />
      </Routes>
    </>
  )
}

export default App
