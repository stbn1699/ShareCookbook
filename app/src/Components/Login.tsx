import {Link, useNavigate} from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const handleLogin = async () => {
        const username: string = (document.getElementById('Login') as HTMLInputElement).value;
        const password: string = (document.getElementById('password') as HTMLInputElement).value;
        const errorDiv = document.getElementById('error');

        const response = await fetch(`http://localhost:3001/user/check?username=${username}`);
        const data = await response.json();

        if (!data.exists) {
            if (errorDiv) {
                errorDiv.innerText = 'Nom d\'utilisateur ou email inconnu';
            }
        } else {
            const loginResponse = await fetch(`http://localhost:3001/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (loginResponse.ok) {
                navigate('/MainPage');
            } else {
                if (errorDiv) {
                    errorDiv.innerText = 'Mot de passe invalide';
                }
            }
        }
    }

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
            <div id="error"></div>
            <div className="buttons-container">
                <Link to="/SignUp">
                    <button className="buttons signup josefin-slab">Sign Up</button>
                </Link>
                <button className="buttons signin josefin-slab" onClick={handleLogin}>Sign In</button>
            </div>
        </div>
    );
}

export default Login