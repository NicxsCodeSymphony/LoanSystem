import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Client from './pages/Client';
import LoanInfo from './pages/Loan';
import EditClient from './pages/EditClient';
import AddClient from './pages/CreateClient';
import UserType from './pages/UserType';
import CreateUserType from './components/CreateUserType';
import EditUserType from './components/EditUserType';
import PrivateRoute from './crud/PrivateRoute';
import Prints from './pages/Print';
import LoginLink from './crud/LoginRoute';
import Register from './pages/Register';

function App() {
  return (
    <div className="page">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<LoginLink><Login /></LoginLink>} />
        <Route path="/register" element={<PrivateRoute><Register /></PrivateRoute>} />
        <Route path="/client" element={<PrivateRoute><Client /></PrivateRoute>} />
        <Route path="/client" element={<PrivateRoute><Client /></PrivateRoute>} />
        <Route path="/Loan/:id" element={<PrivateRoute><LoanInfo /></PrivateRoute>} />
        <Route path="/clientEdit/:id" element={<PrivateRoute><EditClient /></PrivateRoute>} />
        <Route path="/createClient" element={<PrivateRoute><AddClient /></PrivateRoute>} />
        <Route path="/usertype" element={<PrivateRoute><UserType /></PrivateRoute>} />
        <Route path="/create/userType" element={<PrivateRoute><CreateUserType /></PrivateRoute>} />
        <Route path="/edit/usertype/:id" element={<PrivateRoute><EditUserType /></PrivateRoute>} />
        <Route path="/print/:id/:id" element={<PrivateRoute><Prints /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
