import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Col, Input, Label, Button } from "reactstrap";
import Api from "../Api";
import "../css/forms.css";

function NewPlantForm ({ plantData, currUser }) {
    const nav = useNavigate();

    const [formData, setFormData] = useState({ ...plantData });

    useEffect(() => {
        setFormData({ ...plantData });
    }, []);

    /** Update formData */
    const handleChange = (e) => {
        if (e.target.type === "checkbox") {
            if (e.target.checked === true) {
                setFormData((data) => ({
                    ...data,
                    [e.target.name]: true,
                }));
            }
            else {
                setFormData((data) => ({
                    ...data,
                    [e.target.name]: false,
                }));
            }
        }
        else {
            setFormData((data) => ({
                ...data,
                [e.target.name]: e.target.value,
            }));
        }
    };

    /** Call addPlant with formData */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await Api.addPlant({
                user_id: +currUser.userId,
                common_name: formData.common_name,
                scientific_name: formData.scientific_name,
                bloom_color: {
                    one: formData.one || null,
                    two: formData.two || null,
                    three: formData.three || null
                },
                bloom_months: {
                    jan: formData.janEntry || false,
                    feb: formData.febEntry || false,
                    mar: formData.marEntry || false,
                    apr: formData.aprEntry || false,
                    may: formData.mayEntry || false,
                    jun: formData.junEntry || false,
                    jul: formData.julEntry || false,
                    aug: formData.augEntry || false,
                    sep: formData.sepEntry || false,
                    oct: formData.octEntry || false,
                    nov: formData.novEntry || false,
                    dec: formData.decEntry || false,
                }
            },
                currUser.token);
            if (res === "success") {
                nav('/plants');
            }
        }
        catch (errors) {
            console.log(errors);
        }
    };

    return (
        formData ?
            <div>
                <h6>Enter plant information</h6>
                <div className="container">
                    <div className="row">
                        <Form style={{ margin: "1em" }} onSubmit={handleSubmit}>
                            <Col>
                                <FormGroup floating>
                                    <Input
                                        id="common_name"
                                        name="common_name"
                                        placeholder="common_name"
                                        type="text"
                                        autoComplete="common_name"
                                        value={formData.common_name || undefined}
                                        onChange={handleChange}
                                    />
                                    <Label htmlFor="common_name">Common Name</Label>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup floating>
                                    <Input
                                        id="scientific_name"
                                        name="scientific_name"
                                        placeholder="scientific_name"
                                        type="text"
                                        autoComplete="scientific_name"
                                        value={formData.scientific_name || undefined}
                                        onChange={handleChange}
                                    />
                                    <Label htmlFor="scientific_name">Scientific Name</Label>
                                </FormGroup>
                            </Col>
                            <Col>
                                Bloom Colors
                                <FormGroup floating>
                                    <Input
                                        id="one"
                                        name="one"
                                        placeholder="one"
                                        type="text"
                                        value={formData.one || undefined}
                                        onChange={handleChange}
                                    />
                                    <Label htmlFor="one">Bloom Color One</Label>
                                </FormGroup>
                                <FormGroup floating>
                                    <Input
                                        id="two"
                                        name="two"
                                        placeholder="two"
                                        type="text"
                                        value={formData.two}
                                        onChange={handleChange}
                                    />
                                    <Label htmlFor="two">Bloom Color Two</Label>
                                </FormGroup>
                                <FormGroup floating>
                                    <Input
                                        id="three"
                                        name="three"
                                        placeholder="three"
                                        type="text"
                                        value={formData.three || undefined}
                                        onChange={handleChange}
                                    />
                                    <Label htmlFor="three">Bloom Color Three</Label>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup> Bloom Months
                                    <br />
                                    <Input
                                        className="btn-check"
                                        autoComplete="off"
                                        id="janEntry"
                                        name="janEntry"
                                        placeholder="jan"
                                        type="checkbox"
                                        value={formData.janEntry}
                                        checked={formData.janEntry}
                                        onChange={handleChange}
                                    />
                                    <Label className="btn btn-outline-primary" htmlFor="janEntry">Jan</Label>
                                    <Input
                                        className="btn-check"
                                        autoComplete="off"
                                        id="febEntry"
                                        name="febEntry"
                                        placeholder="feb"
                                        type="checkbox"
                                        value={formData.febEntry}
                                        checked={formData.febEntry}
                                        onChange={handleChange}
                                    />
                                    <Label className="btn btn-outline-primary" htmlFor="febEntry">Feb</Label>
                                    <Input
                                        className="btn-check"
                                        autoComplete="off"
                                        id="marEntry"
                                        name="marEntry"
                                        placeholder="mar"
                                        type="checkbox"
                                        value={formData.marEntry}
                                        checked={formData.marEntry}
                                        onChange={handleChange}
                                    />
                                    <Label className="btn btn-outline-primary" htmlFor="marEntry">Mar</Label>
                                    <Input
                                        className="btn-check"
                                        autoComplete="off"
                                        id="aprEntry"
                                        name="aprEntry"
                                        placeholder="apr"
                                        type="checkbox"
                                        value={formData.aprEntry}
                                        checked={formData.aprEntry}
                                        onChange={handleChange}
                                    />
                                    <Label className="btn btn-outline-primary" htmlFor="aprEntry">Apr</Label>
                                    <Input
                                        className="btn-check"
                                        autoComplete="off"
                                        id="mayEntry"
                                        name="mayEntry"
                                        placeholder="may"
                                        type="checkbox"
                                        value={formData.mayEntry}
                                        checked={formData.mayEntry}
                                        onChange={handleChange}
                                    />
                                    <Label className="btn btn-outline-primary" htmlFor="mayEntry">May</Label>
                                    <Input
                                        className="btn-check"
                                        autoComplete="off"
                                        id="junEntry"
                                        name="junEntry"
                                        placeholder="jun"
                                        type="checkbox"
                                        value={formData.junEntry}
                                        checked={formData.junEntry}
                                        onChange={handleChange}
                                    />
                                    <Label className="btn btn-outline-primary" htmlFor="junEntry">Jun</Label>
                                    <br />
                                    <Input
                                        className="btn-check"
                                        autoComplete="off"
                                        id="julEntry"
                                        name="julEntry"
                                        placeholder="jul"
                                        type="checkbox"
                                        value={formData.julEntry}
                                        checked={formData.julEntry}
                                        onChange={handleChange}
                                    />
                                    <Label className="btn btn-outline-primary" htmlFor="julEntry">Jul</Label>
                                    <Input
                                        className="btn-check"
                                        autoComplete="off"
                                        id="augEntry"
                                        name="augEntry"
                                        placeholder="aug"
                                        type="checkbox"
                                        value={formData.augEntry}
                                        checked={formData.augEntry}
                                        onChange={handleChange}
                                    />
                                    <Label className="btn btn-outline-primary" htmlFor="augEntry">Aug</Label>
                                    <Input
                                        className="btn-check"
                                        autoComplete="off"
                                        id="sepEntry"
                                        name="sepEntry"
                                        placeholder="sep"
                                        type="checkbox"
                                        value={formData.sepEntry}
                                        checked={formData.sepEntry}
                                        onChange={handleChange}
                                    />
                                    <Label className="btn btn-outline-primary" htmlFor="sepEntry">Sep</Label>
                                    <Input
                                        className="btn-check"
                                        autoComplete="off"
                                        id="octEntry"
                                        name="octEntry"
                                        placeholder="oct"
                                        type="checkbox"
                                        value={formData.octEntry}
                                        checked={formData.octEntry}
                                        onChange={handleChange}
                                    />
                                    <Label className="btn btn-outline-primary" htmlFor="octEntry">Oct</Label>
                                    <Input
                                        className="btn-check"
                                        autoComplete="off"
                                        id="novEntry"
                                        name="novEntry"
                                        placeholder="nov"
                                        type="checkbox"
                                        value={formData.novEntry}
                                        checked={formData.novEntry}
                                        onChange={handleChange}
                                    />
                                    <Label className="btn btn-outline-primary" htmlFor="novEntry">Nov</Label>
                                    <Input
                                        className="btn-check"
                                        autoComplete="off"
                                        id="decEntry"
                                        name="decEntry"
                                        placeholder="dec"
                                        type="checkbox"
                                        value={formData.decEntry}
                                        checked={formData.decEntry}
                                        onChange={handleChange}
                                    />
                                    <Label className="btn btn-outline-primary" htmlFor="decEntry">Dec</Label>
                                </FormGroup>
                            </Col>
                            <Button>Add Plant</Button>
                        </Form >
                    </div>
                </div>
            </div> :
            <div>...loading</div>
    );
}

export default NewPlantForm;