//** Renders a single cell in the visual garden grid */
function Cell ({ cell, cellSize, plant, handleCellSelect }) {

    return (
        <td
            key={`${cell.row}-${cell.column}`}
            data-row={cell.row}
            data-column={cell.column}
            onClick={handleCellSelect}
            style={{
                border: "2px black solid",
                width: `${cellSize}%`,
                height: `${cellSize}%`,
                textOverflow: "ellipsis"
            }}>
            {plant ? plant.common_name : null}
        </td>
    );
}

export default Cell;