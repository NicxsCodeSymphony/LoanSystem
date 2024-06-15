import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Client from './pages/Client'
import LoanInfo from './pages/Loan'
import EditClient from './pages/EditClient'
import AddClient from './pages/CreateClient'
import UserType from './pages/UserType'
import CreateUserType from './components/CreateUserType'
import EditUserType from './components/EditUserType'
import Prints from './pages/Print'


function App() {

  return (
    <div className='page'>
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/Client' element={<Client />}></Route>
        <Route path='/Loan/:id' element={<LoanInfo />}></Route>
        <Route path='/clientEdit/:id' element={<EditClient />}></Route>
        <Route path='/createClient' element={<AddClient />}></Route>
        <Route path='/usertype' element={<UserType />}></Route>
        <Route path='/create/userType' element={<CreateUserType />}></Route>
        <Route path='/edit/usertype/:id' element={<EditUserType />}></Route>
        <Route path='/print/:id/:id' element={<Prints />}></Route>
       
      </Routes>
    </div>
  )
}

export default App
