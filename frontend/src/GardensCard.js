import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Api from './Api';
import { Box, Button, Card, CardContent, CardActions, CardMedia, List, ListItem, Typography } from '@mui/material';

function GardensCard ({ currUser }) {

    const nav = useNavigate('/');

    const [gardens, setGardens] = useState([]);

    async function getGardens () {
        try {
            let gardensRes = await Api.getUserGardens(currUser.token);
            setGardens(gardensRes);
        }
        catch (errors) {
            console.log(errors.message);
        }
    }

    // Call getGardens on initial render (get logged-in user's gardens)
    useEffect(() => {
        getGardens();
    }, []);

    return (
        <Box sx={{ margin: 2 }}>
            <Card sx={{ minWidth: 275, maxWidth: "30%" }} elevation={5}>
                <CardMedia
                    sx={{ height: 140 }}
                    image="wildflowers.jpg"
                    title="wildflowers"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        My Gardens
                    </Typography>
                    {gardens.length ?
                        <div>
                            {gardens.map(garden => (
                                <div key={garden.garden_id}>
                                    {garden.name}<br />
                                </div>))}
                        </div> :
                        <div>You have no saved gardens.<br />
                            Create some gardens.</div>
                    }
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => nav('/gardens')}>Go to Gardens</Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default GardensCard;