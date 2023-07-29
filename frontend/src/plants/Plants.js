import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../Api";

function Plants ({ currUser }) {
    const nav = useNavigate();

    const [plants, setPlants] = useState([]);

    async function getPlants () {
        try {
            let plantsRes = await Api.getUserPlants(+currUser.userId, currUser.token);
            setPlants(plantsRes);
        }
        catch (errors) {
            console.log(errors.message);
        }
    }

    // Call getPlants on initial render (get logged-in user's plants)
    useEffect(() => {
        getPlants();
    }, []);

    /** Call Api.deletePlant for selected plant */
    const deletePlant = async (plant) => {
        try {
            await Api.deletePlant(plant.plant_id, plant.user_id, currUser.token);
            getPlants();
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="">
            <div className="container">
                {plants ? plants.map(plant => (
                    <div className="row"
                        key={plant.plant_id}>
                        <div
                            className="col"
                            style={{ textAlign: "right" }}
                        >
                            {plant.common_name} <br />
                            (<i>{plant.scientific_name}</i>)
                        </div>
                        <div className="col">
                            <button className="btn btn-sm btn-outline-primary" onClick={() => nav(`/plants/${plant.plant_id}`)}>edit</button><br />
                            <button className="btn btn-sm btn-outline-danger" onClick={() => deletePlant(plant)}>delete</button>
                        </div>
                    </div>)) : null}
            </div>
            <div className="row">
                <div className="col" style={{ display: "flex", justifyContent: "center" }}>
                    <button className="btn btn-success" onClick={() => nav("new")}>Get more plants</button>
                </div>
            </div>
        </div>
    );
}

export default Plants;