import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

function EditPlant ({ currUser }) {

    const nav = useNavigate();

    const { plant_id } = useParams();
    console.log(plant_id);

    const [formData, setFormData] = useState();

    useEffect(() => {
        async function getPlant () {
            try {
                let plant = await Api.getPlant(plant_id, currUser.token);
                console.log(plant);
                setFormData({
                    common_name: plant.common_name || "",
                    scientific_name: plant.scientific_name || "",
                    one: plant.bloom_color.one || null,
                    two: plant.bloom_color.two || null,
                    three: plant.bloom_color.three || null,
                    bloom_months: {
                        jan: plant.bloom_months.jan || false,
                        feb: plant.bloom_months.feb || false,
                        mar: plant.bloom_months.mar || false,
                        apr: plant.bloom_months.apr || false,
                        may: plant.bloom_months.may || false,
                        jun: plant.bloom_months.jun || false,
                        jul: plant.bloom_months.jul || false,
                        aug: plant.bloom_months.aug || false,
                        sep: plant.bloom_months.sep || false,
                        oct: plant.bloom_months.oct || false,
                        nov: plant.bloom_months.nov || false,
                        dec: plant.bloom_months.dec || false,
                    }
                });
            }
            catch (errors) {
                console.log(errors);
            }
        }
        getPlant();
    }, []);

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
            const res = await Api.editPlant(plant_id, {

                // user_id: +currUser.userId,
                common_name: formData.common_name || "",
                scientific_name: formData.scientific_name || "",
                bloom_color: {
                    one: formData.one || "",
                    two: formData.two || "",
                    three: formData.three || ""
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
            // if (res === "success") {
            nav('/plants');
            // }
        }
        catch (errors) {
            console.log(errors);
        }
    };

    return (
        formData ?
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
                        Edit Plant
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                            <TextField
                                margin="normal"
                                required
                                id="common_name"
                                label="Common Name"
                                name="common_name"
                                autoComplete="common name"
                                value={formData.common_name || ""}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                id="scientific_name"
                                label="Scientific Name"
                                name="scientific_name"
                                autoComplete="scientific name"
                                value={formData.scientific_name || ""}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                            <TextField
                                margin="normal"
                                id="one"
                                label="Bloom Color One"
                                name="one"
                                autoComplete="bloom color one"
                                value={formData.one || ""}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                id="two"
                                label="Bloom Color Two"
                                name="two"
                                autoComplete="bloom color two"
                                value={formData.two || ""}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                id="three"
                                label="Bloom Color Three"
                                name="three"
                                autoComplete="bloom color three"
                                value={formData.three || ""}
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
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Card>
            </Box> :
            null
    );
}

export default EditPlant;