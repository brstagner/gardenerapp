import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Api from "../Api";

function Gardens ({ currUser }) {

    const nav = useNavigate();

    const [gardens, setGardens] = useState([]);

    async function getGardens () {
        try {
            let res = await Api.getUserGardens(+currUser.userId, currUser.token);
            setGardens(res);
        }
        catch (errors) {
            console.log(errors);
            nav('/');
        }
        return;
    }

    // Call getPlants on initial render (get logged-in user's plants)
    useEffect(() => {
        getGardens();
    }, []);

    /** Call Api.deleteGarden for selected garden */
    const deleteGarden = async (garden) => {
        try {
            await Api.deleteGarden(garden.garden_id, garden.user_id, currUser.token);
            getGardens();
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col"
                    style={{ alignItems: "center" }}
                >
                    {gardens ? gardens.map(garden => (
                        <div className="row" key={garden.garden_id}>
                            <div className="col"
                                style={{ textAlign: "right" }}
                            >
                                <Link to={`/gardens/${garden.garden_id}`}>
                                    {garden.name}
                                </Link>
                            </div>
                            <div className="col">
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => { deleteGarden(garden); getGardens(); }}>Delete</button>
                            </div>
                        </div>))
                        : null}
                    <div className="col"
                        style={{ display: "flex", justifyContent: "center" }}>
                        <button
                            className="btn btn-success"
                            onClick={() => nav("new")}>Add a Garden</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Gardens;