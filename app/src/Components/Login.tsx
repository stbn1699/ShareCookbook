import { Link } from 'react-router-dom';
import '../Styles/Login.css';
import '../Styles/Fonts.css'

function Login(){
    return (
        <div className="login">
            <h1 className="josefin-slab title">ShareCookBook</h1>
            <div className="login-inputs">
                <input type="text"
                       className="input josefin-slab"
                       placeholder="Login"
                       id="Login"/>
                <br/>
                <input type="password"
                       className="input josefin-slab"
                       placeholder="Password"
                       id="password"/>
            </div>
            <div className="buttons-container">
                <Link to="/SignUp">
                    <button className="buttons signup josefin-slab">Sign Up</button>
                </Link>
                <Link to="/MainPage">
                    <button className="buttons signin josefin-slab">Sign In</button>
                </Link>
            </div>
        </div>
    );
}

export default Login