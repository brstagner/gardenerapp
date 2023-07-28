import Cell from "./Cell";

//** Renders visual garden grid as html table */
function Grid ({ grid, plants, handleCellSelect }) {

    const numRows = grid.dimensions.height;
    const numCols = grid.dimensions.width;
    const rows = [];
    const cellSize = 100 / grid.dimensions.width;

    // Construct rows
    for (let y = 1; y <= numRows; y++) {

        const row = [];

        // Construct cells
        for (let x = 1; x <= numCols; x++) {

            // Get cell info from grid object
            const cell = grid.rows[y].cells[x];

            // Get plant info with plant_id from cell info
            const plant = plants.find(p => p.plant_id === cell.plant_id);

            row.push(
                <Cell key={`${cell.row}-${cell.column}`} cell={cell} cellSize={cellSize} plant={plant} handleCellSelect={handleCellSelect} />
            );
        }

        rows.push(<tr key={y}>{row}</tr>);
    }

    return <table style={{
        aspectRatio: numCols / numRows,
        width: "100%",
        textAlign: "center",
        textSizeAdjust: "auto",
        cursor: "pointer"
    }}><tbody>{rows}</tbody></table>;

}

export default Grid;