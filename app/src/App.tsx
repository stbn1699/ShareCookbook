import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import './App.css';
import Login from "./Components/Login";
import MainPage from "./Components/MainPage";
import Recipe from "./Components/Recipe";
import SignUp from "./Components/SignUp";
import NewRecipe from "./Components/NewRecipe";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/MainPage" element={<MainPage/>}/>
                <Route path="/Recipe/:uuid" element={<Recipe/>}/>
                <Route path="/NewRecipe" element={<NewRecipe/>}/>
                <Route path="/SignUp" element={<SignUp/>}/>
            </Routes>
        </Router>
    );
}

export default App;