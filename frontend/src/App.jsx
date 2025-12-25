import { React, useEffect } from 'react'

import AOS from 'aos'
import 'aos/dist/aos.css';

import { Routes, Route } from 'react-router-dom'
import AdminHome from './Pages/AdminHome.jsx'
import AdminMessages from './Pages/AdminMessages.jsx'
import Home from './Pages/Home.jsx'

import Register from './Pages/Register.jsx';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes.jsx';
import Login from './Pages/Login.jsx';
import AgentPraposalMessages from './Pages/AgentPraposalMessages.jsx';
import ManageAdmin from './Pages/ManageAdmin.jsx';

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,      // animation duration
      once: false,        // allow animation every time you scroll up/down
      mirror: true,       // animate elements when scrolling past them again
    });
  }, []);
  return (
    <div>


      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />

        <Route path='/admin/Register' element={
          <ProtectedRoutes>
          <Register />
          </ProtectedRoutes>
          } />

        <Route path='/admin' element={
          <ProtectedRoutes>
            <AdminHome />
          </ProtectedRoutes>
        }
        />
        <Route path='/admin/messages' element={
          <ProtectedRoutes>
            <AdminMessages/>
          </ProtectedRoutes>} />

          <Route path='/admin/ai-agent-proposals'
        element={
         <ProtectedRoutes>
          
          <AgentPraposalMessages/>
          </ProtectedRoutes>}
          />

          <Route path='/admin/manageadmin' element={
            <ProtectedRoutes>
              <ManageAdmin/>
            </ProtectedRoutes>
          }
            />
          
      </Routes>
    </div>
  )
}

export default App
