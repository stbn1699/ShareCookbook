import '../Styles/Login.css';
import '../Styles/Fonts.css'

function SignUp(){
    const handleClick = async () => {
        console.log('good1')
        const username: string = (document.getElementById('username') as HTMLInputElement).value;
        const email: string = (document.getElementById('email') as HTMLInputElement).value;
        const fullName: string = (document.getElementById('fullName') as HTMLInputElement).value;
        const password: string = (document.getElementById('password') as HTMLInputElement).value;
        const confirmPassword: string = (document.getElementById('confirmPassword') as HTMLInputElement).value;
        const errorDiv = document.getElementById('error');

        if (password === confirmPassword){
            console.log('good2')
            const response = await fetch(
                `${process.env.API_URL}/user/check?username=${username}&email=${email}`
            );
            const data = await response.json();

            if (data.exists) {
                console.log('cet email ou username existe déjà!');
                if (errorDiv){
                    errorDiv.innerText = 'cet email ou username existe déjà!';
                }
            } else if (!data.exists) {
                console.log('good3')
                const newUser = { username, email, fullName, password };
                const addUserResponse = await fetch(`${process.env.API_URL}/user/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser),
                });
                console.log(addUserResponse);
                const addUserResult = await addUserResponse.json();
                console.log(addUserResult);
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
        <div className="login">
            <h1 className="josefin-slab title">ShareCookBook</h1>
            <div className="login-inputs">
                <input type="text"
                       className="input josefin-slab"
                       placeholder="Username"
                       id="username"/>
                <br/>
                <input type="email"
                       className="input josefin-slab"
                       placeholder="Email"
                       id="email"/>
                <br/>
                <input type="text"
                       className="input josefin-slab"
                       placeholder="Full name"
                       id="fullName"/>
                <br/>
                <input type="password"
                       className="input josefin-slab"
                       placeholder="Password"
                       id="password"/>
                <br/>
                <input type="password"
                       className="input josefin-slab"
                       placeholder="Confirm Password"
                       id="confirmPassword"/>
            </div>
            <div id="error"></div>
            <div className="buttons-container">
                <button className="buttons signup josefin-slab" onClick={handleClick}>Create Account</button>
            </div>
        </div>
    );
}

export default SignUp