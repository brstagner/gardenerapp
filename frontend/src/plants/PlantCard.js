import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, CardActions, CardMedia, List, ListItem, Typography } from '@mui/material';
import Plants from "./Plants";

function PlantCard ({ plant, deletePlant }) {

    const nav = useNavigate();

    // const cardColors = [plant.bloom_color.one || null, plant.bloom_color.two || null, plant.bloom_color.three || null];
    const cardColors = Object.values(plant.bloom_color).filter(Boolean);
    // const colorString = cardColors.length <= 1 ? cardColors : `linear-gradient(to right, ${cardColors})`;
    let colorString;
    if (cardColors.length <= 1) colorString = cardColors;
    if (cardColors.length === 2) colorString = `linear-gradient(to right, ${cardColors[0]} 49%, ${cardColors[1]} 50%)`;
    if (cardColors.length === 3) colorString = `linear-gradient(to right, ${cardColors[0]} 32%, ${cardColors[1]} 34%, ${cardColors[1]} 65%, ${cardColors[2]} 67%)`;

    const months = Object.keys(plant.bloom_months).filter((key) => plant.bloom_months[key] === true);
    console.log(months);


    return (
        <Box
            key={plant.plant_id}
            sx={{ margin: 2 }}>
            <Card sx={{ minWidth: 275, maxWidth: "30%" }} elevation={5}>
                {/* <div style={{ height: 40, backgroundColor: plant.bloom_color.one }}
                ></div> */}
                <div
                    // style={{ backgroundColor: plant.bloom_color.one }}
                    style={{ backgroundColor: colorString, backgroundImage: colorString }}
                >
                    <CardMedia
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
                    Blooms: {Object.keys(plant.bloom_months)
                        .filter(month => plant.bloom_months[month] === true)
                        .join(', ')}
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