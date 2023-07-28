import { useNavigate } from "react-router-dom";
import "../../css/build.css";

// Renders a list of clickable plant divs for selecting information to place in garden grid
function Plants ({ plants, handlePlantSelect }) {
    const nav = useNavigate();
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h6>Select a plant from your list by clicking it.</h6>
                    <h6>Select "REMOVE PLANT" to clear cells.</h6>
                    <h6>Add that plant to your garden by clicking a cell.</h6>
                    {/* Displays list of saved plants for adding to garden grid */}
                    <div className="row">
                        <div className="col">
                            {plants ? plants.map(plant => (
                                <div className="row"
                                    key={plant.plant_id}>
                                    <div
                                        data-id={plant.plant_id}
                                        onClick={handlePlantSelect}
                                        style={{ textAlign: "right", padding: "5px", cursor: "pointer" }}
                                        className="col plant-div">
                                        {plant.common_name}<br />
                                        (<i>{plant.scientific_name}</i>)<br />
                                        <div className="row plant-div-child">
                                            <div className="col plant-div-child">
                                                Blooms in
                                            </div><br />
                                            <div
                                                className="col plant-div-child"
                                                style={{ backgroundColor: `${plant.bloom_color.one}`, padding: "5px", outline: "1px solid black", color: "white", textShadow: "0 0 4px black, 0 0 4px black, 0 0 4px black, 0 0 4px black" }}
                                            >{
                                                    Object.keys(plant.bloom_months)
                                                        .filter((month) => plant.bloom_months[month])
                                                        .join(', ')}</div>
                                        </div>
                                    </div>
                                    <div className="col d-flex justify-content-left">
                                        <div className=" row align-content-center">
                                            <a
                                                className="btn btn-sm btn-primary"
                                                href={`/plants/${plant.plant_id}`}>edit</a>
                                        </div>

                                    </div>
                                </div>)) : null}

                            {/* Selectable option for emptying a cell in garden grid */}
                            <div className="row">
                                <div
                                    className="plant-div col" style={{ textAlign: "right", padding: "5px", cursor: "pointer" }}
                                    data-id={null}
                                    onClick={handlePlantSelect}>
                                    REMOVE PLANT
                                </div>
                                <div className="col"></div>
                            </div>
                        </div><br />
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-success" onClick={() => nav("/plants/new")}>Get more plants</button>
                        </div>
                    </div>
                </div >
            </div>
        </div>);

}

export default Plants;