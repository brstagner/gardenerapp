import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Col, Input, Label, Button } from "reactstrap";
import "../css/forms.css";

/** Registered user login form */
function LogIn ({ login, currUser }) {
    let nav = useNavigate();

    const initialState = {
        username: "",
        password: "",
    };

    const [formData, setFormData] = useState(initialState);

    /** Update formData */
    const handleChange = (e) => {
        setFormData((data) => ({
            ...data,
            [e.target.name]: e.target.value,
        }));
    };

    /** Call login with form data */
    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);
        nav(`/`);

    };

    return (
        <div>
            <h4>Log In</h4>
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
                            <label htmlFor="password">Password</label>
                        </FormGroup>
                    </Col>
                    <Button>Sign In</Button>
                </Form>
            </div>
        </div>
    );
}

export default LogIn;