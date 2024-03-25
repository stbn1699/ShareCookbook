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

        if (username.length > 20) {
            if (errorDiv){
                errorDiv.innerText = 'Le nom d\'utilisateur ne doit pas dépasser 20 caractères!';
            }
            return;
        }

        if (email.length > 100) {
            if (errorDiv){
                errorDiv.innerText = 'L\'email ne doit pas dépasser 100 caractères!';
            }
            return;
        }

        if (fullName.length > 100) {
            if (errorDiv){
                errorDiv.innerText = 'Le nom complet ne doit pas dépasser 100 caractères!';
            }
            return;
        }

        if (password.length > 255) {
            if (errorDiv){
                errorDiv.innerText = 'Le mot de passe ne doit pas dépasser 255 caractères!';
            }
            return;
        }

        if (password === confirmPassword){
            const response = await fetch(
                `${sessionStorage.getItem('apiUrl')}/user/check?username=${username}&email=${email}`
            );
            const data = await response.json();

            if (data.exists) {
                console.log('cet email ou username existe déjà!');
                if (errorDiv){
                    errorDiv.innerText = 'cet email ou username existe déjà!';
                }
            } else if (!data.exists) {
                const newUser = { username, email, fullName, password };
                const addUserResponse = await fetch(`${sessionStorage.getItem('apiUrl')}/user/add`, {
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
                       placeholder="Nom d'utilisateur"
                       id="username"/>
                <br/>
                <input type="email"
                       className="SignUp-input josefin-slab"
                       placeholder="E-mail"
                       id="email"/>
                <br/>
                <input type="text"
                       className="SignUp-input josefin-slab"
                       placeholder="Nom"
                       id="fullName"/>
                <br/>
                <input type="password"
                       className="SignUp-input josefin-slab"
                       placeholder="Mot de passe"
                       id="password"/>
                <br/>
                <input type="password"
                       className="SignUp-input josefin-slab"
                       placeholder="Confirmer mot de passe"
                       id="confirmPassword"/>
            </div>
            <div id="error"></div>
            <div className="SignUp-buttons-container">
                <button className="SignUp-buttons SignUp-goback josefin-slab" onClick={() => navigate(-1)}>Retour</button>
                <button className="SignUp-buttons SignUp-signup-btn josefin-slab" onClick={handleClick}>Valider</button>
            </div>
        </div>
    );
}

export default SignUp