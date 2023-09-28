import { useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import PlantSelectionDialog from "./PlantSelectionDialog";


function PlantSearchDialog ({ currUser, plants, message, fetchPlantInfo }) {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" type="submit" onClick={handleClickOpen}>
                Search
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
                <DialogTitle id="alert-dialog-title">
                    Search Results
                </DialogTitle>
                <DialogContent>
                    {plants.length ? null : message}
                    {plants.map(plant =>
                        <PlantSelectionDialog currUser={currUser} key={plant.slug} plant={plant} fetchPlantInfo={fetchPlantInfo} />
                    )}
                </DialogContent>
            </Dialog>
        </div>);

}

export default PlantSearchDialog;