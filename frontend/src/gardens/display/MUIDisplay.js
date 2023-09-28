import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Card, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import DisplayGrid from "./DisplayGrid";
import Api from "../../Api";

//** Component for rendering visual garden display with color */
function Display ({ currUser }) {
    const nav = useNavigate();

    const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

    //
    // INITIAL COMPONENT RENDER:
    //

    // Get garden_id from url
    const { garden_id } = useParams();

    // State for garden object
    const [garden, setGarden] = useState();

    // Get garden info from database
    const getGarden = async () => {
        try {
            let res = await Api.getGarden(garden_id, currUser.token);
            setGarden(res);
            return;
        }
        catch (error) {
            console.log(error);
            nav('/');
        }
    };

    // State for user's saved plants
    const [plants, setPlants] = useState([]);

    // Get user's saved plants from database
    const getPlants = async () => {
        try {
            let res = await Api.getUserPlants(+currUser.userId, currUser.token);
            setPlants(res);
        }
        catch (errors) {
            console.log(errors);
            nav('/');
        }
    };

    useEffect(() => {
        getGarden();
        getPlants();
    }, []);

    //
    // GRID INTERACTION LOGIC:
    //

    // State for currently displayed month
    const [selectedMonth, setSelectedMonth] = useState();

    // State for whether leaves on plants
    const [leafed, setLeafed] = useState(true);

    const handleMonthChange = (e) => {
        const monthPick = e.target.value;
        setSelectedMonth(monthPick);

        ['mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct'].includes(monthPick) ?
            setLeafed(true) :
            setLeafed(false);
    };

    return garden ?
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Card
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px"
                }}
            >
                <Typography
                    variant="h5"
                    component="h1"
                    sx={{
                        flexGrow: 1,
                        mr: 2,
                        fontFamily: "Caprasimo",
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    {garden.name}
                </Typography>
                <ToggleButtonGroup
                    value={selectedMonth}
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexWrap: 'wrap'
                    }}
                    exclusive
                >
                    {monthNames.map((monthName, index) => (
                        <ToggleButton
                            key={index}
                            value={monthName}
                            onClick={handleMonthChange}
                        >
                            {monthName}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
                <Box>
                    <DisplayGrid
                        grid={garden.grid}
                        month={selectedMonth}
                        leafed={leafed}
                        plants={plants}
                    />
                </Box>
            </Card>
        </Box>
        : null;
}

export default Display;