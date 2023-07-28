import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Col, Input, Label, Button, Alert } from "reactstrap";
import "../css/forms.css";

function Register ({ currUser, register }) {
    const nav = useNavigate();

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

    /** Call addUser with formData */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await register({
            ...formData,
            location: { name: formData.location }
        });
        if (res.token) {
            nav('');
        }
    };

    return (
        <div>
            <h4>Register</h4>
            <div style={{ display: "flex", justifyContent: "left" }}>
                <div style={{ display: "flex", justifyContent: "left" }}>
                    <Form style={{ margin: "1em" }} onSubmit={handleSubmit}>
                        <Col>
                            <FormGroup floating>
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="username"
                                    type="text"
                                    autoComplete="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                                <Label htmlFor="username">Username</Label>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup floating>
                                <Input
                                    id="password"
                                    name="password"
                                    placeholder="password"
                                    type="password"
                                    autoComplete="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <Label htmlFor="password">Password</Label>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup floating>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="email"
                                    type="text"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <Label htmlFor="email">Email</Label>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup floating>
                                <Input
                                    id="location"
                                    name="location"
                                    placeholder="location"
                                    type="text"
                                    autoComplete="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                                <Label htmlFor="location">Location</Label>
                            </FormGroup>
                        </Col>
                        <Button>Register</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Register;