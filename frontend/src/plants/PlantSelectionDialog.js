import { useState } from "react";
import TrefleApi from "../trefle/Api";
import Api from "../Api";
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText
} from "@mui/material";

function PlantSelectionDialog ({ currUser, plant }) {

    const [plantInfo, setPlantInfo] = useState({
        id: undefined,
        common_name: undefined,
        scientific_name: undefined,
        one: undefined,
        two: undefined,
        three: undefined
    });

    const [open, setOpen] = useState(false);

    const fetchPlantInfo = async (plantId) => {

        const res = await TrefleApi.getSpecies(plantId);

        const speciesData = {};
        if (res.id) speciesData.id = res.id;
        if (res.common_name) speciesData.common_name = res.common_name;
        if (res.scientific_name) speciesData.scientific_name = res.scientific_name;
        if (res.flower.color) {
            speciesData.one = res.flower.color[0] || "";
            speciesData.two = res.flower.color[1] || "";
            speciesData.three = res.flower.color[2] || "";
        };
        if (res.growth.bloom_months) {
            res.growth.bloom_months.map(month =>
                speciesData.bloom_months[`${month}`] = true
            );
        };
        setPlantInfo(speciesData);
        console.log(speciesData);
    };

    const handleClickOpen = () => {
        const res = fetchPlantInfo(plant.id);
        setPlantInfo(res);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /** Call addPlant with plantInfo */
    const handleAdd = async () => {
        try {
            console.log(plantInfo);
            const res = await Api.addPlant({
                user_id: +currUser.userId,
                common_name: plantInfo.common_name,
                scientific_name: plantInfo.scientific_name,
                bloom_color: {
                    one: plantInfo.one || null,
                    two: plantInfo.two || null,
                    three: plantInfo.three || null
                },
                bloom_months: {
                    jan: plantInfo.bloom_months.jan || false,
                    feb: plantInfo.bloom_months.feb || false,
                    mar: plantInfo.bloom_months.mar || false,
                    apr: plantInfo.bloom_months.apr || false,
                    may: plantInfo.bloom_months.may || false,
                    jun: plantInfo.bloom_months.jun || false,
                    jul: plantInfo.bloom_months.jul || false,
                    aug: plantInfo.bloom_months.aug || false,
                    sep: plantInfo.bloom_months.sep || false,
                    oct: plantInfo.bloom_months.oct || false,
                    nov: plantInfo.bloom_months.nov || false,
                    dec: plantInfo.bloom_months.dec || false,
                }
            },
                currUser.token);
            handleClose();
        }
        catch (errors) {
            console.log(errors);
        }
    };


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                {plant.common_name} ({plant.scientific_name})
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {plant.common_name} ({plant.scientific_name})
                </DialogTitle>
                <DialogContent>

                    {plantInfo.id ?
                        <DialogContentText>
                            Colors:
                            {plantInfo.one || "none"},
                            {plantInfo.three || "none"},
                            {plantInfo.three || "none"}<br />
                            Months:
                            {/* {plantInfo.bloom_months.filter(month)} */}
                        </DialogContentText> :
                        "fetching species info..."
                    }

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleAdd} autoFocus>
                        Save plant
                    </Button>
                </DialogActions>
            </Dialog>
        </div>);

}

export default PlantSelectionDialog;