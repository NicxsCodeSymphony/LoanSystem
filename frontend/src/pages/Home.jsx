// import '../styles/Home.css'
import HomeHeading from '../components/homeHeading'
import '../styles/Home.css'
import { useNavigate } from 'react-router-dom'
export default function Home(){
    const navigate = useNavigate()

    const handleNavigation = (path) => {
        navigate(path);
    };

    return(
        <div className='home-container5'>
           <HomeHeading />

            <div className='container5'>
                <div className='left-container5'>
                    <h3 className='heading35'>PAYMENT UP TO 50K</h3>
                    <h1 className='heading15'>Easiest place to apply <br /> for your loan</h1>
                    <p className='paragraph5'>Need some fast case? Bad credit history? Try DiffeyLoan and <br /> feel secure in your future</p>
                    <button className='button5' onClick={() => handleNavigation('/login')}>Get Started</button>
                </div>
                <div className='right-container5'></div>
            </div>
        </div>
    )
}
