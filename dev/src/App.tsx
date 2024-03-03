import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';

function LoginPage() {
    // Votre code de connexion ici
    return <h1>Login Page</h1>;
}

function MainPage() {
    // Votre code de page principale ici
    return (
        <div>
            <h1>Main Page</h1>
            <BottomBar/>
        </div>
    );
}

function BottomBar() {
    // Votre code de barre de navigation inférieure ici
    return <h2>Bottom Bar</h2>;
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/" element={<MainPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;