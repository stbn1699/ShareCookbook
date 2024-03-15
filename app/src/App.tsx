import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Login from "./Components/Login";
import MainPage from "./Components/MainPage";
import Recipe from "./Components/Recipe";
import SignUp from "./Components/SignUp";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/MainPage" element={<MainPage/>}/>
                <Route path="/Recipe" element={<Recipe/>}/>
                <Route path="/SignUp" element={<SignUp/>}/>
            </Routes>
        </Router>
    );
}

export default App;