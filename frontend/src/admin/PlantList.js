import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../Api";

// List of plants for all users, viewable by admins, with delete
function PlantList ({ currUser }) {
    const nav = useNavigate();

    const [plants, setPlants] = useState([]);

    async function getPlants () {
        try {
            let res = await Api.getAllPlants(currUser.token);
            setPlants(res);
        }
        catch (error) {
            console.log(error);
            nav('/');
        }
    }

    const deletePlant = async (plant_id) => {
        try {
            await Api.deletePlant(plant_id, 0, currUser.token);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPlants();
        // cut dependency array
        // }, []);
    });

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "left",
                    flexWrap: "wrap",
                }}>
                {plants.map(plant => (
                    <div key={plant.plant_id} style={{ padding: "5px" }}>
                        name: {plant.common_name}<br />
                        user_id: {plant.user_id}<br />
                        <button onClick={() => { deletePlant(plant.plant_id); getPlants(); }}>Delete Plant</button>
                    </div>))}
            </div>
        </div>
    );
}

export default PlantList;