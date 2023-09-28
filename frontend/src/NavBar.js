import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { MenuSharp } from '@mui/icons-material';
import DrawerMenu from "./DrawerMenu";
import './css/nav.css';

const NavBar = ({ currUser, logout }) => {

    const nav = useNavigate();

    const handleLogout = () => {
        logout();
        nav('/');
    };

    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer}
                    >
                        <MenuSharp />
                    </IconButton>
                    <Typography
                        variant="h5"
                        component="a"
                        href="/"
                        sx={{
                            flexGrow: 1,
                            mr: 2,
                            fontFamily: "Caprasimo",
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Gardener
                    </Typography>
                    {currUser ?
                        <Button color="inherit" onClick={handleLogout}>Logout</Button> :
                        null
                    }
                </Toolbar>
            </AppBar>
            <DrawerMenu currUser={currUser} open={drawerOpen} onClose={toggleDrawer} />
        </Box>
    );
};

export default NavBar;