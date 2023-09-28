import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Button, Grid, Item, Paper, Typography } from "@mui/material";
import Api from "../Api";
import GardenCard from "./GardenCard";

function Gardens ({ currUser }) {

    const nav = useNavigate();

    const [gardens, setGardens] = useState([]);

    async function getGardens () {
        try {
            let res = await Api.getUserGardens(+currUser.userId, currUser.token);
            setGardens(res);
        }
        catch (errors) {
            console.log(errors);
            nav('/');
        }
        return;
    }

    // Call getgardens on initial render (get logged-in user's gardens)
    useEffect(() => {
        getGardens();
    }, []);

    /** Call Api.deleteGarden for selected garden */
    const deleteGarden = async (garden) => {
        try {
            await Api.deleteGarden(garden.garden_id, garden.user_id, currUser.token);
            getGardens();
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        // <div className="container-fluid">
        //     <div className="row">
        //         <div className="col"
        //             style={{ alignItems: "center" }}
        //         >
        //             {gardens ? gardens.map(garden => (
        //                 <div className="row" key={garden.garden_id}>
        //                     <div className="col"
        //                         style={{ textAlign: "right" }}
        //                     >
        //                         <Link to={`/gardens/${garden.garden_id}`}>
        //                             {garden.name}
        //                         </Link>
        //                     </div>
        //                     <div className="col">
        //                         <button
        //                             className="btn btn-sm btn-outline-danger"
        //                             onClick={() => { deleteGarden(garden); getGardens(); }}>Delete</button>
        //                     </div>
        //                 </div>))
        //                 : null}
        //             <div className="col"
        //                 style={{ display: "flex", justifyContent: "center" }}>
        //                 <button
        //                     className="btn btn-success"
        //                     onClick={() => nav("new")}>Add a Garden</button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <Box sx={{
            marginTop: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Grid sx={{ width: "fit-content", justifyContent: "center", alignItems: 'center', }}>
                <Typography
                    variant="h5"
                    component="h1"
                    sx={{
                        flexGrow: 1,
                        mr: 2,
                        margin: 4,
                        fontFamily: "Caprasimo",
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    Your Gardens
                </Typography>
                <Grid container spacing={2} sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {gardens ? gardens.map(garden => (
                        <GardenCard key={garden.garden_id} garden={garden} deleteGarden={deleteGarden} />
                    )) : null}
                </Grid>
                <Button onClick={() => nav("new")}>Get more gardens</Button>
            </Grid>
        </Box>
    );
}

export default Gardens;