import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import DisplayGrid from "./DisplayGrid";
import Api from "../../Api";

//** Component for rendering visual garden display with color */
function Display ({ currUser }) {
    const nav = useNavigate();

    //
    // INITIAL COMPONENT RENDER:
    //

    // Get garden_id from url
    const { garden_id } = useParams();

    // State for garden object
    const [garden, setGarden] = useState();

    // Get garden info from database
    const getGarden = async () => {
        try {
            let res = await Api.getGarden(garden_id, currUser.token);
            setGarden(res);
            return;
        }
        catch (error) {
            console.log(error);
            nav('/');
        }
    };

    // State for user's saved plants
    const [plants, setPlants] = useState([]);

    // Get user's saved plants from database
    const getPlants = async () => {
        try {
            let res = await Api.getUserPlants(+currUser.userId, currUser.token);
            setPlants(res);
        }
        catch (errors) {
            console.log(errors);
            nav('/');
        }
    };

    useEffect(() => {
        getGarden();
        getPlants();
    }, []);

    //
    // GRID INTERACTION LOGIC:
    //

    // Show plant information when clicking in cell
    const handleCellSelect = () => { };

    // State for currently displayed month
    const [month, setMonth] = useState();

    // State for whether leaves on plants
    const [leafed, setLeafed] = useState();

    //** Update month/leafed on month click */
    const handleMonth = (e) => {
        const monthPick = e.target.id;
        setMonth(monthPick);

        ['mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct'].includes(monthPick) ?
            setLeafed(true) :
            setLeafed(false);
    };

    return garden ?
        <div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{garden.name}
                            <Link
                                className="btn btn-sm btn-outline-primary"
                                to={`/gardens/edit/${garden_id}`}>edit
                            </Link>
                        </h4>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <ErrorBoundary fallback={<div>Something went wrong</div>}>
                            <DisplayGrid
                                grid={garden.grid}
                                month={month}
                                leafed={leafed}
                                handleCellSelect={handleCellSelect}
                                plants={plants} />
                        </ErrorBoundary>
                    </div>

                    {/* Inputs for months */}
                    <div className="col">
                        <h6>Select a month to see what will be in bloom</h6>
                        <div className="row">
                            <input type="radio"
                                className="btn-check" name="month" id="jan" autoComplete="off"
                                onClick={handleMonth} />
                            <label className="btn btn-outline-primary" htmlFor="jan">Jan</label>
                            <input type="radio"
                                className="btn-check" name="month" id="feb" autoComplete="off"
                                onClick={handleMonth} />
                            <label className="btn btn-outline-primary" htmlFor="feb">Feb</label>
                            <input type="radio"
                                className="btn-check" name="month" id="mar" autoComplete="off"
                                onClick={handleMonth} />
                            <label className="btn btn-outline-primary" htmlFor="mar">Mar</label>
                            <input type="radio"
                                className="btn-check" name="month" id="apr" autoComplete="off"
                                onClick={handleMonth} />
                            <label className="btn btn-outline-primary" htmlFor="apr">Apr</label>
                        </div>
                        <div className="row">
                            <input type="radio"
                                className="btn-check" name="month" id="may" autoComplete="off"
                                onClick={handleMonth} />
                            <label className="btn btn-outline-primary" htmlFor="may">May</label>
                            <input type="radio"
                                className="btn-check" name="month" id="jun" autoComplete="off"
                                onClick={handleMonth} />
                            <label className="btn btn-outline-primary" htmlFor="jun">Jun</label>

                            <input type="radio"
                                className="btn-check" name="month" id="jul" autoComplete="off"
                                onClick={handleMonth} />
                            <label className="btn btn-outline-primary" htmlFor="jul">Jul</label>
                            <input type="radio"
                                className="btn-check" name="month" id="aug" autoComplete="off"
                                onClick={handleMonth} />
                            <label className="btn btn-outline-primary" htmlFor="aug">Aug</label>
                        </div>
                        <div className="row">
                            <input type="radio"
                                className="btn-check" name="month" id="sep" autoComplete="off"
                                onClick={handleMonth} />
                            <label className="btn btn-outline-primary" htmlFor="sep">Sep</label>
                            <input type="radio"
                                className="btn-check" name="month" id="oct" autoComplete="off"
                                onClick={handleMonth} />
                            <label className="btn btn-outline-primary" htmlFor="oct">Oct</label>
                            <input type="radio"
                                className="btn-check" name="month" id="nov" autoComplete="off"
                                onClick={handleMonth} />
                            <label className="btn btn-outline-primary" htmlFor="nov">Nov</label>
                            <input type="radio"
                                className="btn-check" name="month" id="dec" autoComplete="off"
                                onClick={handleMonth} />
                            <label className="btn btn-outline-primary" htmlFor="dec">Dec</label>
                        </div>
                    </div>
                </div>
            </div>
        </div> : null;
}

export default Display;