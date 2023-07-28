import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Col, Input, Label, Button, Alert } from "reactstrap";
import Api from "../Api";
import "../css/forms.css";

/** User profile edit form */
function Profile ({ editProfile, currUser }) {
    let nav = useNavigate();

    const [formData, setFormData] = useState();

    const [username, setUsername] = useState();

    const [error, setError] = useState();

    useEffect(() => {
        async function getUser () {
            try {
                let res = await Api.getUser(+currUser.userId, currUser.token);
                setFormData({
                    username: res.username,
                    email: res.email,
                    location: res.location.name,
                    password: "",
                    confirm: ""
                });
                setUsername(res.username);
            }
            catch (err) {
                console.log(err);
                nav('/');
            }
        }
        getUser();
    }, []);

    /** Update formData */
    const handleChange = (e) => {
        e.preventDefault();
        setFormData((data) => ({
            ...data,
            [e.target.name]: e.target.value,
        }));
    };

    /** Call editProfile with form data */
    const handleSubmit = async (e) => {
        try {
            let res;
            e.preventDefault();
            if (!formData.email.includes('@')) {
                throw new Error("Email format invalid");
            }
            if (formData.password !== formData.confirm) {
                throw new Error("Password and Password Confirmation do not match");
            }
            if (!formData.password) {
                res = await editProfile({
                    newUsername: formData.username,
                    email: formData.email,
                    location: { name: formData.location }
                });
            } else {
                res = await editProfile({
                    newUsername: formData.username,
                    email: formData.email,
                    location: { name: formData.location },
                    password: formData.password
                });
            }
            if (res === "success") {
                nav("/");
            }
        }
        catch (err) {
            setError(err.message);
        }

    };

    return formData ? (
        <div className="container">
            <h4>Edit Profile</h4>
            {error ?
                <Alert
                    color="danger"
                    style={{ width: "fit-content" }}
                    key={error}>
                    {error}
                </Alert>
                : null}
            <div className="row">
                <Form onSubmit={handleSubmit}>
                    <Col>
                        <FormGroup floating>
                            <Input
                                id="username"
                                name="username"
                                placeholder="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            <Label htmlFor="username">username</Label>
                        </FormGroup>
                    </Col>
                    <FormGroup floating>
                        <Input
                            id="email"
                            name="email"
                            placeholder="email"
                            type="text"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <Label htmlFor="email">email</Label>
                    </FormGroup>
                    <FormGroup floating>
                        <Input
                            id="location"
                            name="location"
                            placeholder="location"
                            type="text"
                            value={formData.location}
                            onChange={handleChange}
                        />
                        <Label htmlFor="location">location</Label>
                    </FormGroup>
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
                            <Label htmlFor="password">password</Label>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup floating>
                            <Input
                                id="confirm"
                                name="confirm"
                                placeholder="confirm"
                                type="password"
                                autoComplete="confirm"
                                value={formData.confirm}
                                onChange={handleChange}
                            />
                            <Label htmlFor="confirm">confirm password</Label>
                        </FormGroup>
                    </Col>
                    <Button>Save Changes</Button>
                </Form>
            </div>
        </div>
    ) : null;
}

export default Profile;