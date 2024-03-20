import { useNavigate } from 'react-router-dom';
import '../Styles/SignUp.css';
import '../Styles/Fonts.css';

function SignUp(){

    const navigate = useNavigate();

    const handleClick = async () => {
        console.log('good1')
        const username: string = (document.getElementById('username') as HTMLInputElement).value;
        const email: string = (document.getElementById('email') as HTMLInputElement).value;
        const fullName: string = (document.getElementById('fullName') as HTMLInputElement).value;
        const password: string = (document.getElementById('password') as HTMLInputElement).value;
        const confirmPassword: string = (document.getElementById('confirmPassword') as HTMLInputElement).value;
        const errorDiv = document.getElementById('error');

        if (password === confirmPassword){
            const response = await fetch(
                `http://localhost:3001/user/check?username=${username}&email=${email}`
            );
            const data = await response.json();

            if (data.exists) {
                console.log('cet email ou username existe déjà!');
                if (errorDiv){
                    errorDiv.innerText = 'cet email ou username existe déjà!';
                }
            } else if (!data.exists) {
                const newUser = { username, email, fullName, password };
                const addUserResponse = await fetch(`http://localhost:3001/user/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser),
                });

                if (addUserResponse.ok) {
                    const addUserResult = await addUserResponse.json();
                    console.log(addUserResult);
                    navigate('/');
                } else {
                    console.log('error while contacting the server!');
                    if (errorDiv){
                        errorDiv.innerText = 'erreur inconnue';
                    }
                }
            } else {
                console.log('error while contacting the server!');
                if (errorDiv){
                    errorDiv.innerText = 'erreur inconnue';
                }
            }
        } else {
            if (errorDiv){
                errorDiv.innerText = 'Passwords do not match!';
            }
        }
    }

    return (
        <div className="SignUp-signup">
            <h1 className="josefin-slab SignUp-title">ShareCookBook</h1>
            <div className="SignUp-inputs">
                <input type="text"
                       className="SignUp-input josefin-slab"
                       placeholder="Username"
                       id="username"/>
                <br/>
                <input type="email"
                       className="SignUp-input josefin-slab"
                       placeholder="Email"
                       id="email"/>
                <br/>
                <input type="text"
                       className="SignUp-input josefin-slab"
                       placeholder="Full name"
                       id="fullName"/>
                <br/>
                <input type="password"
                       className="SignUp-input josefin-slab"
                       placeholder="Password"
                       id="password"/>
                <br/>
                <input type="password"
                       className="SignUp-input josefin-slab"
                       placeholder="Confirm Password"
                       id="confirmPassword"/>
            </div>
            <div id="error"></div>
            <div className="SignUp-buttons-container">
                <button className="SignUp-buttons SignUp-goback josefin-slab" onClick={() => navigate(-1)}>Back</button>
                <button className="SignUp-buttons SignUp-signup-btn josefin-slab" onClick={handleClick}>Create Account</button>
            </div>
        </div>
    );
}

export default SignUp