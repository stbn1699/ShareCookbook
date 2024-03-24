import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Login from "./Components/Login";
import MainPage from "./Components/MainPage";
import Recipe from "./Components/Recipe";
import SignUp from "./Components/SignUp";
import NewRecipe from "./Components/NewRecipe";
import Parametres from "./Components/Parametres";
import Account from "./Components/Account";
import Commentaires from "./Components/Commentaires";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/MainPage" element={<MainPage/>}/>
                <Route path="/Recipe/:uuid" element={<Recipe/>}/>
                <Route path="/NewRecipe" element={<NewRecipe/>}/>
                <Route path="/SignUp" element={<SignUp/>}/>
                <Route path="*" element={<Login/>}/>
                <Route path="/Parametres" element={<Parametres/>}/>
                <Route path="/Account" element={<Account/>}/>
                <Route path="/Commentaires/:uuid" element={<Commentaires/>}/>
            </Routes>
        </Router>
    );
}

export default App;


/* TODO et trucs a fix : faire des options de compte comme changer son username, au moins pour le moment afficher les infos*/