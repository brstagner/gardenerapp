import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormGroup, Input, Label } from "reactstrap";
import Api from "../../Api";
import Grid from "./Grid";
import Dimensions from "./Dimensions";
import Plants from "./Plants";
import "../../css/forms.css";

//** Either generates a new garden to post, or edits an existing garden to patch */
function GardenBuilder ({ currUser }) {

    const nav = useNavigate();

    //
    // INITIAL COMPONENT RENDER:
    //

    // Get garden_id from url
    const { garden_id } = useParams();

    // State for plant data for filling visual garden grid
    const [plants, setPlants] = useState([]);

    //** Gets plants saved by the current user */
    const getPlants = async () => {
        try {
            let res = await Api.getUserPlants(currUser.token);
            setPlants(res);
        }
        catch (errors) {
            console.log(errors);
            nav('/');
        }
    };

    // Default garden object for a new garden
    // if page is not rendered to edit an existing garden
    const newGarden = {
        name: "New Garden",
        grid: {
            dimensions: { height: 1, width: 1 },
            rows: {
                1: {
                    row: 1, cells: {
                        1: { plant_id: undefined, row: 1, column: 1 }
                    }
                }
            }
        }
    };

    // State for garden object
    const [garden, setGarden] = useState();


    //** Sets garden state with relevant garden data */
    const getGarden = async () => {
        try {
            garden_id ?
                // Get garden data with supplied garden_id (for editing)
                setGarden(await Api.getGarden(garden_id, currUser.token)) :
                // Use default new garden data for garden creation
                setGarden(newGarden);
        }
        catch (errors) {
            console.log(errors);
        }
    };

    useEffect(() => {
        getPlants();
        getGarden();
    }, []);

    /** Update garden name */
    const handleName = (e) => {
        setGarden({ ...garden, name: e.target.value });
    };

    //** Add or remove rows and columns from grid */
    const updateGrid = (axis, operation) => {
        const grid = { ...garden.grid };
        const row = grid.dimensions.height;
        const col = grid.dimensions.width;
        const gridUpdate = { ...grid };
        if (axis === 'row') {
            if (operation === 'increment' && row < 20) {
                const newRow = {
                    row: row + 1, cells: {}
                };
                for (let x = 1; x <= col; x++) {
                    newRow.cells[x] = { plant_id: undefined, row: row + 1, column: x };
                }
                gridUpdate.rows[row + 1] = newRow;
                gridUpdate.dimensions.height = row + 1;
            }
            if (operation === 'decrement' && row > 1) {
                delete gridUpdate.rows[row];
                gridUpdate.dimensions.height = row - 1;
            }
        }
        if (axis === 'column') {
            if (operation === 'increment' && col < 20) {
                for (let y = 1; y <= row; y++) {
                    gridUpdate.rows[y].cells[col + 1] = { plant_id: undefined, row: y, column: col + 1 };
                }
                gridUpdate.dimensions.width = col + 1;
            }
            if (operation === 'decrement' && col > 1) {
                for (let y = row; y > 0; y--) {
                    delete gridUpdate.rows[y].cells[col];
                }
                gridUpdate.dimensions.width = col - 1;
            }
        }
        setGarden({ ...garden, grid: gridUpdate });
    };

    //
    // GRID FILLING LOGIC:
    //

    // Select a plant from user plants
    const [plant, setPlant] = useState([]);

    const handlePlantSelect = (e) => {
        // Set currently selected plant for placement in grid
        setPlant(e.target.closest('.plant-div').dataset.id);

        // Get list of potentially highlighted divs
        const plantDivs = document.querySelectorAll('.plant-div');

        // Clear highlighting
        for (let plant of plantDivs) {
            plant.classList.remove('highlighted');
        }

        // Highlight current selection
        e.target.closest('.plant-div').classList.add('highlighted');
    };

    // Select a cell from grid and update corresponding cell in garden object
    const handleCellSelect = (e) => {
        const row = e.target.dataset.row;
        const column = e.target.dataset.column;
        const gridUpdate = { ...garden.grid };
        gridUpdate.rows[row].cells[column].plant_id = +plant;
        setGarden({ ...garden, grid: gridUpdate });
    };

    //
    // API ROUTES:
    //

    //** Post a new garden to database */
    const postGarden = async () => {
        try {
            let res = await Api.addGarden({ grid: garden.grid, name: garden.name, user_id: +currUser.userId }, currUser.token);
            if (res === "success") {
                nav(`/gardens`);
            }
        }
        catch (errors) {
            console.log(errors);
        }
    };

    //** Patch existing garden in database */
    const patchGarden = async () => {
        try {
            let res = await Api.editGarden(garden_id, { user_id: garden.user_id, name: garden.name, grid: garden.grid }, currUser.token);
            if (res === "success") {
                nav(`/gardens/${garden_id}`);
            }
        }
        catch (errors) {
            console.log(errors);
        }
    };

    return (
        garden ?
            <div>
                {/* Name input */}
                <FormGroup floating>
                    <Input
                        id="name"
                        name="name"
                        placeholder="name"
                        type="text"
                        autoComplete="name"
                        value={garden.name}
                        onChange={handleName}
                    />
                    <Label htmlFor="name">Garden Name</Label>
                </FormGroup>

                <div className="container-fluid">
                    <div className="row">

                        {/* Component for selecting plants to place in grid */}
                        <div className="col">
                            <Plants
                                plants={plants}
                                getPlants={getPlants}
                                handlePlantSelect={handlePlantSelect} />
                        </div>

                        <div className="col"
                            height="50vh">

                            {/* Component for adding/deleting columns/rows in visual grid */}
                            <Dimensions
                                height={garden.grid.dimensions.height}
                                width={garden.grid.dimensions.width}
                                updateGrid={updateGrid} />

                            {/* Component for visual grid */}
                            <Grid
                                grid={garden.grid}
                                plants={plants}
                                handleCellSelect={handleCellSelect} />

                            {/* Existing gardens (for patch) will have a garden_id */}
                            {garden_id ?
                                <button className="btn btn-primary d-inline-block" onClick={patchGarden}>Save Garden</button> :
                                <button className="btn btn-primary d-inline-block" onClick={postGarden}>Save Garden</button>}
                        </div>
                    </div>
                </div>
            </div> :
            null
    );
}

export default GardenBuilder;