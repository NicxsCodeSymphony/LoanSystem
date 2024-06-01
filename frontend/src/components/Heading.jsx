import '../styles/Heading.css'
import { useNavigate } from 'react-router-dom'

export default function Heading(){

    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };


    return(
        <div className='header'>
                <div><h1 className='brand'>Diffey<span>Loan.</span></h1></div> 

                <div className='navbar'>
                    <p className='cursor'>Overview</p>
                    <p className='cursor' onClick={() => handleNavigation('/client')}>Client</p>
                    <p className='cursor'>Loan</p>
                    <p className='cursor' onClick={() => handleNavigation('/userType')}>Usertype</p>
                </div>
                
                
                </div>
                
    )
}