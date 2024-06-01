import '../styles/Home.css'
import { useNavigate } from 'react-router-dom'

export default function HomeHeading(){
    const navigate = useNavigate()

    const handleNavigation = (path) => {
        navigate(path);
    };
    return(
        <div className='header5'>
                <div><h1 className='brand5'>Diffey<span>Loan.</span></h1></div>
                <div className='right5'>
                    <div className='cursor'  onClick={() => handleNavigation('/login')}>Login</div>
                    <div className='cursor'>Sign up</div>
                </div>
            </div>
    )
}