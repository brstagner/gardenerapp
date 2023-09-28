import React from "react";
import { useNavigate } from "react-router-dom";
import CellSelectionDialog from "./CellSelectionDialog";
import PlantSelectionDialog from "../../plants/PlantSelectionDialog";

//** Component displaying visual cell */
function DisplayCell ({ cell, month, leafed, handleCellSelect, plant, cellSize }) {

    const nav = useNavigate();

    // Cell color reflects flower color if plant is in bloom  
    const inBloom = plant ? (plant.bloom_months[month]) : null;

    // Cell color is green if not in bloom and not leafed, else brown
    const leafColor = leafed ? 'green' : '#7f7053';

    // const getPlant = () => {
    //     if (plant) { nav(`/plants/${plant.plant_id}`); };
    // };

    return (
        <td className="square-cell"
            title={plant ? plant.common_name : null}
            key={`${cell.row}-${cell.column}`}
            data-row={cell.row} data-column={cell.column}
            // onClick={getPlant}
            style={{
                aspectRatio: 1 / 1,
                width: `${cellSize}%`,
                height: `${cellSize}%`,
                border: "2px black solid",
                backgroundColor: inBloom ? `${plant.bloom_color.one}` : leafColor
            }}
        >
            {plant ?
                <CellSelectionDialog plant={plant} /> :
                null}
        </td>
    );
}

export default DisplayCell;