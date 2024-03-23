import React, {useEffect, useState} from "react";
import Header from "./Header";
import {BsDash, BsPlus} from "react-icons/bs";
import BottomBar from "./BottomBar";
import "../Styles/NewRecipe.css";
import {createMuiTheme, Tab, Tabs, ThemeProvider} from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {useNavigate} from "react-router-dom";


function NewRecipe() {
    const userUUID = localStorage.getItem('userUUID') || sessionStorage.getItem('userUUID');
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [title, setTitle] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [numPeople, setNumPeople] = useState("");
    const [tabValue, setTabValue] = useState(0);
    const [recipePreview, setRecipePreview] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    const theme = createMuiTheme({
        typography: {
            fontFamily: '"Josefin Slab", serif',
        },
        overrides: {
            MuiTabs: {
                indicator: {
                    backgroundColor: '#6A994E',
                },
            },
            MuiTab: {
                root: {
                    fontWeight: 'bolder',
                },
            },
        },
    });

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue);
    };

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

    const contentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    const addRecipe = async () => {
        const response = await fetch(`${sessionStorage.getItem('apiUrl')}/publications/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "title": title,
                "uuid": userUUID,
                "info_1": prepTime,
                "info_2": numPeople,
                "content":
                    `## Ingrédients\n\n` +
                    `${ingredients.map(ingredient => `- ${ingredient}`).join('\n') || "∅"}\n\n` +
                    `## Préparation\n\n` +
                    `${content || "∅"}`,
            }),
        })

        let data;
        if (response.status === 200) {
            data = await response.json();
            console.log("Recette ajoutée");
            navigate('/Recipe/' + data.uuid);
        } else if (response.status === 500) {
            console.error('Erreur serveur');
        } else {
            console.error('Erreur inconnue');
        }

        return data;
    }

    const resetRecipe = () => {
        setIngredients([]);
        setInputValue("");
        setTitle("");
        setPrepTime("");
        setNumPeople("");
        setContent("");
    };

    useEffect(() => {
        if (tabValue === 1) {
            setRecipePreview(
                `## Ingrédients\n\n` +
                `${ingredients.map(ingredient => `- ${ingredient}`).join('\n') || "∅"}\n\n` +
                `## Préparation\n\n` +
                `${content || "∅"}`);
        }
    }, [tabValue]);

    return (
        <div className="application-page">
            <div className="application-header">
                <Header headerStyle="NewRecipe"/>
            </div>
            <div className="application-page-content">
                <ThemeProvider theme={theme}>
                    <Tabs value={tabValue} onChange={handleTabChange} style={{display: 'flex'}}>
                        <Tab label="Nouvelle recette" style={{flexGrow: 1}}/>
                        <Tab label="Prévisualisation" style={{flexGrow: 1}}/>
                    </Tabs>
                </ThemeProvider>
                {tabValue === 0 && (
                    <div>
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
                                    <input type="number" value={prepTime}
                                           onChange={(e) => setPrepTime(e.target.value)}/>
                                    <input type="number" value={numPeople}
                                           onChange={(e) => setNumPeople(e.target.value)}/>
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
                                        <button className="NewRecipe-suppr-button"
                                                onClick={() => removeIngredient(index)}>
                                            <BsDash/></button>
                                        <div className="NewRecipe-ingredient-previev-text"
                                             onClick={() => removeIngredient(index)}>{ingredient}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="NewRecipe-section josefin-slab">
                            <div className="NewRecipe-title">Contenu de la recette</div>
                            <div className="NewRecipe-content-textarea-box">
                                <textarea className="NewRecipe-content-textarea" value={content}
                                          onChange={contentChange}></textarea>
                            </div>
                        </div>
                        <button onClick={resetRecipe}>Reset</button>
                        <button onClick={() => addRecipe()}>Valider</button>
                    </div>
                )}
                {tabValue === 1 && (
                    <div>
                    <div className="recipe-header">
                            <div className="recipe-title josefin-slab">
                                {title || "∅"}
                            </div>
                            <div className="recipe-infos josefin-slab">
                                <div>{prepTime || "∅"} min</div>
                                <div>{numPeople || "∅"} personnes</div>
                                <div>∅ likes</div>
                            </div>
                        </div>
                        <div className="recipe-content josefin-slab">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {recipePreview}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>
            <div className="application-bottomBar">
                <BottomBar activePage="3"/>
            </div>
        </div>
    );
}

export default NewRecipe;