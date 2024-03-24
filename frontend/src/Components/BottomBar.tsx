import {Link} from "react-router-dom";
import '../Styles/Main.css';
import '../Styles/Icons.css';
import {BsFillGearFill, BsHouseFill, BsPersonFill, BsPlusCircleFill, BsSearch} from "react-icons/bs";

function BottomBar(props: { activePage: string }) {

    let home = "#f2e8cf";
    let search = "#f2e8cf";
    let plus = "#f2e8cf";
    let person = "#f2e8cf";
    let gear = "#f2e8cf";


    switch (props.activePage) {
        case "0":
            break;
        case "1":
            home = "#d3cab4";
            break;
        case "2":
            search = "#d3cab4";
            break;
        case "3":
            plus = "#d3cab4";
            break;
        case "4":
            person = "#d3cab4";
            break;
        case "5":
            gear = "#d3cab4";
            break;
        default:
            break;
    }

    return (<div className="bottom-bar">

            <Link to="/MainPage">
                <button>
                    <BsHouseFill style={{fontSize: '35px', color: `${home}`}}/>
                </button>
            </Link>

            <Link to="/SearchRecipe">
                <button>
                    <BsSearch style={{fontSize: '35px', color: `${search}`}}/>
                </button>
            </Link>

            <Link to="/NewRecipe">
                <button>
                    <BsPlusCircleFill style={{fontSize: '35px', color: `${plus}`}}/>
                </button>
            </Link>

            <Link to="/Account">
                <button>
                    <BsPersonFill style={{fontSize: '35px', color: `${person}`}}/>
                </button>
            </Link>

            <Link to="/Parametres">
                <button>
                    <BsFillGearFill style={{fontSize: '35px', color: `${gear}`}}/>
                </button>
            </Link>

        </div>
    );
}

export default BottomBar;