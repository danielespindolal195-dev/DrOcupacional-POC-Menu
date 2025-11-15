import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MenuList from './components/MenuList'
import MenuForm from './components/MenuForm'

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<MenuList />} />
          <Route path="/cadastro" element={<MenuForm />} />
          <Route path="/editar/:id" element={<MenuForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

