import '../styles/Home.css'
import { useNavigate } from 'react-router-dom'

export default function HomeHeading(){
    return(
        <div className='header'>
                <div><h1 className='brand'>Diffey<span>Loan.</span></h1></div>
                <div className='right'>
                    <div className='cursor'>Login</div>
                    <div className='cursor'>Sign up</div>
                </div>
            </div>
    )
}