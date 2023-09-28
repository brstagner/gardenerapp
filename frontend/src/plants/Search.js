import { useState } from "react";
import Api from "../trefle/Api";
import PlantSearchDialog from './PlantSearchDialog';
import {
    Box,
    Card,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from '@mui/material';

function Search ({ currUser, handlePlantSelect }) {

    const [formData, setFormData] = useState({
        name: '',
        color: '',
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
        },
    });

    // Current page of search results
    const [currentPage, setCurrentPage] = useState(1);

    // Trefle API links to first, previous, next, and last pages of results
    const [pages, setPages] = useState();

    // Currently rendered plants returned by search
    const [plants, setPlants] = useState([]);

    // "loading..." or "no matches found"
    const [message, setMessage] = useState();

    const [plantInfo, setPlantInfo] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Empty plants triggers message
        setPlants([]);

        // A new search result starts at the first page
        setCurrentPage(1);

        // Renders loading message until result returned
        setMessage('searching...');

        // Collects only months with a value 'true', name/color conditions
        // added in case user enters 'true' string into those fields
        let months = [];
        for (const [key, value] of Object.entries(formData.bloom_months)) {
            if (value === true && value !== ('name' || 'color')) {
                months.push(key);
            };
        }

        console.log(months);

        // Sends search criteria to frontend Trefle API middleware
        const res = await Api.plantSearch(
            formData.name,
            formData.color,
            months
        );

        // First page of plant results
        setPlants(res.plants);

        // Pagination API links
        setPages(res.pages);

        // If no results returned
        if (!plants.length) setMessage('No matches found');
    };

    /** Pagination skips a new search, just sends relevent link to Trefle API */
    const handlePage = async (link, newPage) => {
        setPlants([]);
        setMessage('loading...');
        const res = await Api.plantPage(link);
        setPlants(res.plants);
        setCurrentPage(newPage);
        setPages(res.pages);
    };

    const fetchPlantInfo = async (plantId) => {
        const res = await Api.getSpecies(plantId);
        setPlantInfo(res);
    };

    return (
        <Box
            sx={{
                marginTop: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Card sx={{ padding: "20px" }}>
                <Typography component="h1" variant="h5">
                    Plant Search
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="color"
                            label="Color"
                            name="color"
                            autoComplete="color"
                            autoFocus
                            value={formData.color}
                            onChange={handleChange}
                        />
                    </Box>
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
                    <PlantSearchDialog currUser={currUser} plants={plants} message={message} fetchPlantInfo={fetchPlantInfo} />
                </Box>
            </Card>
        </Box>);
};

export default Search;