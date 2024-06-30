import '../styles/Heading.css';
import { useNavigate } from 'react-router-dom';
import Auth from '../crud/Auth';

export default function Heading() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    Auth.logout(); // Perform logout action
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className='header'>
      <div><h1 className='brand'>Diffey<span>Loan.</span></h1></div> 
      <div className='navbar'>
        <p className='cursor'>Overview</p>
        <p className='cursor' onClick={() => handleNavigation('/client')}>Client</p>
        <p className='cursor' onClick={() => handleNavigation('/loan')}>Loan</p>
        <p className='cursor' onClick={() => handleNavigation('/userType')}>Usertype</p>
        <p className='cursor' onClick={handleLogout}>Logout</p>
      </div>
    </div>
  );
}
