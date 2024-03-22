import {useState} from "react";
import Header from "./Header";
import {BsDash, BsPlus} from "react-icons/bs";
import BottomBar from "./BottomBar";
import "../Styles/NewRecipe.css";

function NewRecipe() {
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [title, setTitle] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [numPeople, setNumPeople] = useState("");

    const addIngredientValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const addIngredient = () => {
        if (!ingredients.includes(inputValue) && inputValue !== null && inputValue !== "") {
            setIngredients([...ingredients, inputValue]);
        }
        setInputValue("");
    };

    const removeIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const resetRecipe = () => {
        setIngredients([]);
        setInputValue("");
        setTitle("");
        setPrepTime("");
        setNumPeople("");
    };

    return (
        <div className="application-page">
            <div className="application-header">
                <Header headerStyle="NewRecipe"/>
            </div>
            <div className="application-page-content">
                <div className="NewRecipe-section josefin-slab">
                    <div className="NewRecipe-title">Informations de la recette</div>
                    <div className="NewRecipe-infos-input-box">
                        <div className="NewRecipe-infos-input-labels">
                            <label>Titre de la recette</label>
                            <label>Temps de préparation</label>
                            <label>Nombre de personnes</label>
                        </div>
                        <div className="NewRecipe-infos-input-inputs">
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                            <input type="number" value={prepTime} onChange={(e) => setPrepTime(e.target.value)}/>
                            <input type="number" value={numPeople} onChange={(e) => setNumPeople(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="NewRecipe-section josefin-slab">
                    <div className="NewRecipe-title">Liste des ingrédients</div>
                    <div className="NewRecipe-ingredients-input-box">
                        <input className="NewRecipe-ingredient-input" type="text" value={inputValue}
                               onChange={addIngredientValueChange}/>
                        <button className="NewRecipe-add-button" onClick={addIngredient}><BsPlus/></button>
                    </div>
                    <div className="NewRecipe-ingredients-preview-box">
                        {ingredients.map((ingredient, index) => (
                            <div key={index} className="NewRecipe-ingredient-preview">
                                <button className="NewRecipe-suppr-button" onClick={() => removeIngredient(index)}><BsDash/></button>
                                <div className="NewRecipe-ingredient-previev-text" onClick={() => removeIngredient(index)}>{ingredient}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="NewRecipe-section josefin-slab">
                    <div className="NewRecipe-title">Contenu de la recette</div>
                    <div className="NewRecipe-content-textarea-box">
                        <textarea className="NewRecipe-content-textarea" name="" id=""></textarea>
                    </div>
                </div>
                <button onClick={resetRecipe}>Reset</button>
            </div>
            <div className="application-bottomBar">
                <BottomBar activePage="3"/>
            </div>
        </div>
    );
}

export default NewRecipe;