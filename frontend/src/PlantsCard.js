import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Api from './Api';
import { Box, Button, Card, CardContent, CardActions, CardMedia, List, ListItem, Typography } from '@mui/material';

function PlantsCard ({ currUser }) {

    const nav = useNavigate();

    const [plants, setPlants] = useState([]);

    async function getPlants () {
        try {
            let plantsRes = await Api.getUserPlants(+currUser.userId, currUser.token);
            setPlants(plantsRes);
        }
        catch (errors) {
            console.log(errors.message);
        }
    }

    // Call getPlants on initial render (get logged-in user's plants)
    useEffect(() => {
        getPlants();
    }, []);

    return (
        <Box sx={{ margin: 2 }}>
            <Card sx={{ minWidth: 275, maxWidth: "30%" }} elevation={5}>
                <CardMedia
                    sx={{ height: 140 }}
                    image="sunflower.jpg"
                    title="sunflower"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        My Plants
                    </Typography>
                    {plants.length ?
                        <div>
                            {plants.map(plant => (
                                <div key={plant.plant_id}>
                                    {plant.common_name}<br />
                                </div>))}
                        </div> :
                        <div>You have no saved plants.<br />
                            Add some plants.</div>
                    }
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => nav('/plants')}>Go to Plants</Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default PlantsCard;