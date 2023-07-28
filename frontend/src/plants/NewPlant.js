import React from "react";
import { useState } from "react";
import TrefleApi from "../trefle/Api";
import NewPlantForm from "./NewPlantForm";
import Search from "../trefle/Search";
import "../css/forms.css";

/** Contains NewPlantForm and Search forms for adding plants to database */
function NewPlant ({ currUser }) {

    // Plant data for submission form, supplied by search or entered manually
    const [plantData, setPlantData] = useState({ id: undefined });

    // Select a cell from grid and update corresponding cell in garden object
    const handlePlantSelect = async (e) => {
        e.preventDefault();
        const id = e.target.id;
        const plant = await TrefleApi.getSpecies(id);
        const speciesData = {};
        if (plant.id) speciesData.id = plant.id;
        if (plant.common_name) speciesData.common_name = plant.common_name;
        if (plant.scientific_name) speciesData.scientific_name = plant.scientific_name;
        if (plant.flower.color) {
            speciesData.one = plant.flower.color[0] || "";
            speciesData.two = plant.flower.color[1] || "";
            speciesData.three = plant.flower.color[2] || "";
        };
        if (plant.growth.bloom_months) {
            plant.growth.bloom_months.map(month =>
                speciesData[`${month}Entry`] = true
            );
        };
        setPlantData(speciesData);

        // HIGHLIGHTING

        // Get list of potentially highlighted divs
        const plantDivs = document.querySelectorAll('.plant-div');

        // Clear highlighting
        for (let plant of plantDivs) {
            plant.classList.remove('highlighted');
        }

        // Highlight current selection
        e.target.closest('.plant-div').classList.add('highlighted');
    };

    return (
        <div>
            <h4>Add a Plant to Your Collection</h4>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <Search handlePlantSelect={handlePlantSelect} />
                    </div>
                    <div className="col">
                        <NewPlantForm
                            key={plantData.id}
                            plantData={plantData}
                            currUser={currUser}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewPlant;