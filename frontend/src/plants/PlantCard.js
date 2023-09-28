import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, CardActions, CardMedia, List, ListItem, Typography } from '@mui/material';

function PlantCard ({ plant, deletePlant }) {

    const nav = useNavigate();

    return (
        <Box
            key={plant.plant_id}
            sx={{ margin: 2 }}>
            <Card sx={{ minWidth: 275, maxWidth: "30%" }} elevation={5}>
                {/* <div style={{ height: 40, backgroundColor: plant.bloom_color.one }}
                ></div> */}
                <div style={{ backgroundColor: plant.bloom_color.one }}><CardMedia
                    sx={{ height: 40, filter: "grayscale(100%)", opacity: .5 }}
                    image="sunflower.jpg"
                    title="sunflower"
                />
                </div>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {plant.common_name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontStyle: "italic" }}>
                        {plant.scientific_name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => nav(`/plants/${plant.plant_id}`)}>edit</Button>
                    <Button size="small" onClick={() => deletePlant(plant)}>delete</Button>
                    {/* <Button size="small" onClick={() => nav(`/plants/${plant.plant_id}`)}>Edit</Button> */}
                </CardActions>
            </Card>
        </Box>
    );
}

export default PlantCard;