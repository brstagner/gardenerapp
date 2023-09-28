import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, CardActions, CardMedia, List, ListItem, Typography } from '@mui/material';

function GardenCard ({ garden, deleteGarden }) {

    const nav = useNavigate();

    return (
        <Box
            key={garden.garden_id}
            sx={{ margin: 2 }}>
            <Card sx={{ minWidth: 275, maxWidth: "30%" }} elevation={5}>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {garden.name}
                    </Typography>
                    <div>{garden.grid.dimensions.width} x {garden.grid.dimensions.height}</div>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => nav(`/gardens/${garden.garden_id}`)}>view</Button>
                    <Button size="small" onClick={() => nav(`/gardens/edit/${garden.garden_id}`)}>edit</Button>
                    <Button size="small" onClick={() => deleteGarden(garden)}>delete</Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default GardenCard;