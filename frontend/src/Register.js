import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    TextField,
    Typography
} from '@mui/material';

const Register = ({ register, toggleMode }) => {

    let nav = useNavigate();

    const initialState = {
        username: "",
        password: "",
        email: "",
        location: ""
    };

    const [formData, setFormData] = useState(initialState);

    /** Update formData */
    const handleChange = (e) => {
        setFormData((data) => ({
            ...data,
            [e.target.name]: e.target.value,
        }));
    };

    /** Call register with form data */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({
                ...formData,
                location: { name: formData.location }
            });
            nav('/');
        }
        catch (error) {
            console.log(error);
            nav('/');
        }
    };

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Card sx={{ padding: "20px", maxWidth: '20rem' }}>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="location"
                        label="Location"
                        name="location"
                        autoComplete="location"
                        autoFocus
                        value={formData.location}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                    <div>
                        Already registered?
                        <Button onClick={() => toggleMode()}>
                            Log in here
                        </Button>
                    </div>
                </Box>
            </Card>
        </Box>
    );
};

export default Register;