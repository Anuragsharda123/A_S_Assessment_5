import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UpdatePassword from './component/UpdatePassword'
import Dashboard from './component/Dashboard'
import Profile from './component/Profile'
import Signup from './component/Signup'
import Login from './component/Login'
import Chat from './component/Chat'
import './App.css'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={ <Signup /> } />
        <Route path='/Login' element={ <Login /> } />
        <Route path='/Profile' element={ <Profile /> } />
        <Route path='/Dashboard' element={ <Dashboard /> } />
        <Route path='/Update' element={<UpdatePassword />} />
        <Route path='/Chat/:senderId/:receiverId' element={<Chat />} />
        
      </Routes>
    </Router>
    </>
  )
}

export default App