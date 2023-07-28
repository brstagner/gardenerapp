//** Renders interface for adding/deleting columns/rows from garden object */
function Dimensions ({ height, width, updateGrid }) {

    return (
        < div className="container">
            <h6>Add rows and columns:</h6>
            <div className="row">
                <div className="col">
                    <div className="text-center">Rows: {height}</div>
                    <div className="buttons d-flex justify-content-center">
                        <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => updateGrid("row", "decrement")}
                            data-testid="row-decrement">-</button>
                        <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => updateGrid("row", "increment")}
                            data-testid="row-increment">+</button>
                    </div>
                </div>
                <div className="col">
                    <div className="text-center">Columns: {width}</div>
                    <div className="buttons d-flex justify-content-center">
                        <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => updateGrid("column", "decrement")}
                            data-testid="col-decrement">-</button>
                        <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => updateGrid("column", "increment")}
                            data-testid="col-increment">+</button>
                    </div>
                </div>
            </div >
        </div>
    );
}

export default Dimensions;