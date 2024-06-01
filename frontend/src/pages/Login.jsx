import HomeHeading from "../components/homeHeading"
import '../styles/Login.css'

export default function Login(){
    return(
        <div>
            <div className="login-page">
                <div className="login-container">
                    <div className="wrapper">
                    <h2>Log in</h2>
                    <p className="note">Please, enter your login details below.</p>
                    <input placeholder="Username"/> <br />
                    <input placeholder="Password"/> <br />
                    <button>Log in</button>

                    <p className="forgot">Forgot Password?</p>
                    </div>
                </div>


                
                <div className="image"></div>
            </div>
        </div>
    )
}