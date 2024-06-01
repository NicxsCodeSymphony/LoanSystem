// import '../styles/Home.css'
import HomeHeading from '../components/homeHeading'
export default function Home(){
    return(
        <div className='home-container'>
           <HomeHeading />

            <div className='container'>
                <div className='left-container'>
                    <h3>PAYMENT UP TO 50K</h3>
                    <h1>Easiest place to apply <br /> for your loan</h1>
                    <p>Need some fast case? Bad credit history? Try DiffeyLoan and <br /> feel secure in your future</p>
                    <button className=''>Get Started</button>
                </div>
                <div className='right-container'></div>
            </div>
        </div>
    )
}