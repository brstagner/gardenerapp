import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TrefleApi from "../trefle/Api";
import NewPlantForm from "./NewPlantForm";
import Api from "../Api";
import {
    Box,
    Button,
    Card,
    Grid,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from '@mui/material';
// import Search from "../trefle/Search";
// import "../css/forms.css";

/** Contains NewPlantForm and Search forms for adding plants to database */
function NewPlant ({ currUser }) {

    const nav = useNavigate();


    const [formData, setFormData] = useState({
        common_name: "", scientific_name: "",
        one: "", two: "", three: "",
        bloom_months: {
            jan: false,
            feb: false,
            mar: false,
            apr: false,
            may: false,
            jun: false,
            jul: false,
            aug: false,
            sep: false,
            oct: false,
            nov: false,
            dec: false,
        }
    });

    // // Plant data for submission form, supplied by search or entered manually
    // const [plantData, setPlantData] = useState({ id: undefined });

    // // Select a cell from grid and update corresponding cell in garden object
    // const handlePlantSelect = async (e) => {
    //     e.preventDefault();
    //     const id = e.target.id;
    //     const plant = await TrefleApi.getSpecies(id);
    //     const speciesData = {};
    //     if (plant.id) speciesData.id = plant.id;
    //     if (plant.common_name) speciesData.common_name = plant.common_name;
    //     if (plant.scientific_name) speciesData.scientific_name = plant.scientific_name;
    //     if (plant.flower.color) {
    //         speciesData.one = plant.flower.color[0] || "";
    //         speciesData.two = plant.flower.color[1] || "";
    //         speciesData.three = plant.flower.color[2] || "";
    //     };
    //     if (plant.growth.bloom_months) {
    //         plant.growth.bloom_months.map(month =>
    //             speciesData[`${month}Entry`] = true
    //         );
    //     };
    //     setPlantData(speciesData);



    //     // HIGHLIGHTING

    //     // Get list of potentially highlighted divs
    //     const plantDivs = document.querySelectorAll('.plant-div');

    //     // Clear highlighting
    //     for (let plant of plantDivs) {
    //         plant.classList.remove('highlighted');
    //     }

    //     // Highlight current selection
    //     e.target.closest('.plant-div').classList.add('highlighted');
    // };

    /** Update formData */
    const handleChange = (e) => {
        setFormData((data) => ({
            ...data,
            [e.target.name]: e.target.value,
        }));
    };

    const handleMonthChange = (e) => {
        if (e.target.classList.contains("month")) {
            const newMonthData = formData.bloom_months;
            newMonthData[e.target.value] = !formData.bloom_months[e.target.value];
            setFormData((data) => ({
                ...data,
                bloom_months: newMonthData,
            }));
        }
    };

    /** Call addPlant with formData */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const res = await Api.addPlant({

                user_id: +currUser.userId,
                common_name: formData.common_name,
                scientific_name: formData.scientific_name,
                bloom_color: {
                    one: formData.one || null,
                    two: formData.two || null,
                    three: formData.three || null
                },
                bloom_months: {
                    jan: formData.bloom_months.jan || false,
                    feb: formData.bloom_months.feb || false,
                    mar: formData.bloom_months.mar || false,
                    apr: formData.bloom_months.apr || false,
                    may: formData.bloom_months.may || false,
                    jun: formData.bloom_months.jun || false,
                    jul: formData.bloom_months.jul || false,
                    aug: formData.bloom_months.aug || false,
                    sep: formData.bloom_months.sep || false,
                    oct: formData.bloom_months.oct || false,
                    nov: formData.bloom_months.nov || false,
                    dec: formData.bloom_months.dec || false,
                }
            },
                currUser.token);
            if (res === "success") {
                nav('/plants');
            }
        }
        catch (errors) {
            console.log(errors);
        }
    };

    return (
        // <div>
        //     <h4>Add a Plant to Your Collection</h4>
        //     <div className="container-fluid">
        //         {/* <div className="row">
        //             <div className="col">
        //                 <Search handlePlantSelect={handlePlantSelect} />

        //             </div> */}
        //         <div className="col">
        //             <NewPlantForm
        //                 key={plantData.id}
        //                 plantData={plantData}
        //                 currUser={currUser}
        //             />
        //         </div>
        //         {/* </div> */}
        //     </div>
        // </div>
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Card sx={{ padding: "20px" }}>
                <Typography component="h1" variant="h5">
                    Add a Plant
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField
                            margin="normal"
                            required
                            // fullWidth
                            id="common_name"
                            label="Common Name"
                            name="common_name"
                            autoComplete="common name"
                            autoFocus
                            value={formData.common_name}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            // fullWidth
                            id="scientific_name"
                            label="Scientific Name"
                            name="scientific_name"
                            autoComplete="scientific name"
                            value={formData.scientific_name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField
                            margin="normal"
                            required
                            // fullWidth
                            id="one"
                            label="Bloom Color One"
                            name="one"
                            autoComplete="bloom color one"
                            value={formData.one}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            // fullWidth
                            id="two"
                            label="Bloom Color Two"
                            name="two"
                            autoComplete="bloom color two"
                            value={formData.two}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            // fullWidth
                            id="three"
                            label="Bloom Color Three"
                            name="three"
                            autoComplete="bloom color three"
                            value={formData.three}
                            onChange={handleChange}
                        />
                    </Grid>
                    <ToggleButtonGroup
                        value={Object.keys(formData.bloom_months).filter((month) => formData.bloom_months[month])}
                        onChange={handleMonthChange}
                        aria-label="Months"
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexWrap: 'wrap'
                        }}
                    >
                        {Object.keys(formData.bloom_months).map((month) => (
                            <ToggleButton className={"month"} key={month} value={month}>
                                {month}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Add
                    </Button>
                </Box>
            </Card>
        </Box>
    );
}

export default NewPlant;