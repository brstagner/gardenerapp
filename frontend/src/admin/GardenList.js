import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../Api";

// List of gardens for all users, viewable by admins, with delete
function GardenList ({ currUser }) {
    const nav = useNavigate();

    const [gardens, setGardens] = useState([]);

    async function getGardens () {
        try {
            let gardensRes = await Api.getAllGardens(currUser.token);
            setGardens(gardensRes);
        }
        catch (error) {
            console.log(error);
            nav('/');
        }
    }

    const deleteGarden = async (garden_id) => {
        try {
            await Api.deleteGarden(garden_id, currUser.token);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getGardens();
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
                {gardens.map(garden => (
                    <div key={garden.name} style={{ padding: "5px" }}>
                        name: {garden.name}<br />
                        user_id: {garden.user_id}<br />
                        <button onClick={() => { deleteGarden(garden.garden_id); getGardens(); }}>Delete Garden</button>
                    </div>))}
            </div>
        </div>
    );
}

export default GardenList;