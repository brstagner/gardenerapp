import { useState } from 'react';
import { CssBaseline, Grid, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignIn from "./SignIn";
import Register from "./Register";
import PlantsCard from "./PlantsCard";
import GardensCard from "./GardensCard";

const defaultTheme = createTheme();

function Home ({ currUser, login, register }) {

    const [mode, setMode] = useState('login');

    const toggleMode = () => mode === 'login' ? setMode('register') : setMode('login');

    if (currUser) return (
        <Container
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Grid
                container
                justifyContent="center"
            >
                <Grid
                    container
                    justifyContent="center"
                    item xs={12} sm={6}
                >
                    <PlantsCard currUser={currUser} />
                </Grid>
                <Grid
                    container
                    justifyContent="center"
                    item xs={12} sm={6}
                >
                    <GardensCard currUser={currUser} />
                </Grid>
            </Grid>
        </Container>
    );

    else return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main">
                <CssBaseline />
                {mode === 'login' ?
                    <SignIn login={login} toggleMode={toggleMode} />
                    :
                    <Register register={register} toggleMode={toggleMode} />
                }
            </Container>
        </ThemeProvider>
    );
}

export default Home;