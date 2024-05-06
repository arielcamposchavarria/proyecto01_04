import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import Create from './views/Create'
import Update from './views/Update'
import Read from './views/Read'
import 'bootstrap/dist/css/bootstrap-grid.min.css'


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path= '/' element={<Home />}></Route>
        <Route path= '/create' element={<Create />}></Route>
        <Route path= '/update/:id' element={<Update />}></Route>
        <Route path= '/read/:id' element={<Read />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
