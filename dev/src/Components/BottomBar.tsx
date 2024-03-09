import {Link} from "react-router-dom";
import '../Styles/Main.css';
import '../Styles/Icons.css';
import { BsHouse, BsSearch, BsFillPlusCircleFill, BsPersonFill, BsFillGearFill } from "react-icons/bs";

function BottomBar() {
    return (
            <div className="bottom-bar">

            <Link to="/MainPage" className="button-link">
                <button>
                    <BsHouse style={{ fontSize: '35px', color: "#f2e8cf" }}/>
                </button>
            </Link>

            <Link to="/MainPage" className="button-link">
                <button>
                    <BsSearch style={{ fontSize: '35px', color: "#f2e8cf" }}/>
                </button>
            </Link>

            <Link to="/MainPage" className="button-link">
                <button>
                    <BsFillPlusCircleFill style={{ fontSize: '35px', color: "#f2e8cf" }}/>
                </button>
            </Link>

            <Link to="/MainPage" className="button-link">
                <button>
                    <BsPersonFill style={{ fontSize: '35px', color: "#f2e8cf" }}/>
                </button>
            </Link>

            <Link to="/MainPage" className="button-link">
                <button>
                    <BsFillGearFill style={{ fontSize: '35px', color: "#f2e8cf" }}/>
                </button>
            </Link>

        </div>
    );
}

export default BottomBar;