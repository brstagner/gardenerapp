import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Api from "../Api";

function Plant ({ currUser }) {
    const { plant_id } = useParams();

    let nav = useNavigate();

    const [formData, setFormData] = useState();

    useEffect(() => {
        async function getPlant () {
            try {
                let plant = await Api.getPlant(plant_id, currUser.token);
                setFormData({
                    userId: plant.user_id,
                    common_name: plant.common_name,
                    scientific_name: plant.scientific_name,
                    one: plant.bloom_color.one || undefined,
                    two: plant.bloom_color.two || undefined,
                    three: plant.bloom_color.three || undefined,
                    jan: plant.bloom_months.jan,
                    feb: plant.bloom_months.feb,
                    mar: plant.bloom_months.mar,
                    apr: plant.bloom_months.apr,
                    may: plant.bloom_months.may,
                    jun: plant.bloom_months.jun,
                    jul: plant.bloom_months.jul,
                    aug: plant.bloom_months.aug,
                    sep: plant.bloom_months.sep,
                    oct: plant.bloom_months.oct,
                    nov: plant.bloom_months.nov,
                    dec: plant.bloom_months.dec
                });
            }
            catch (errors) {
                console.log(errors);
            }
        }
        getPlant();
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

    /** Call editProfile with appropriate item type and form data */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await Api.editPlant(plant_id,
                {
                    user_id: formData.userId,
                    common_name: formData.common_name,
                    scientific_name: formData.scientific_name,
                    bloom_color: {
                        one: formData.one || null,
                        two: formData.two || null,
                        three: formData.three || null
                    },
                    bloom_months: {
                        jan: formData.jan,
                        feb: formData.feb,
                        mar: formData.mar,
                        apr: formData.apr,
                        may: formData.may,
                        jun: formData.jun,
                        jul: formData.jul,
                        aug: formData.aug,
                        sep: formData.sep,
                        oct: formData.oct,
                        nov: formData.nov,
                        dec: formData.dec
                    }
                },
                currUser.token
            );
            if (res === "success") {
                nav("/plants");
            }
        }
        catch (errors) {
            console.log(errors);
        }
    };

    return formData ? (
        <div className="container">
            <h4>Edit Plant Details</h4>
            <div className="row">
                <Form onSubmit={handleSubmit}>
                    <Col>
                        <FormGroup floating>
                            <Input
                                id="common_name"
                                name="common_name"
                                placeholder="common_name"
                                type="text"
                                autoComplete="common_name"
                                value={formData.common_name}
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
                                value={formData.scientific_name}
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
                                value={formData.one}
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
                                value={formData.three}
                                onChange={handleChange}
                            />
                            <Label htmlFor="three">Bloom Color Three</Label>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup> Bloom Months<br />
                            <Input
                                className="btn-check"
                                autoComplete="off"
                                id="jan"
                                name="jan"
                                placeholder="jan"
                                type="checkbox"
                                value={formData.jan}
                                checked={formData.jan}
                                onChange={handleChange}
                            />
                            <Label className="btn btn-outline-primary" htmlFor="jan">Jan</Label>
                            <Input
                                className="btn-check"
                                autoComplete="off"
                                id="feb"
                                name="feb"
                                placeholder="feb"
                                type="checkbox"
                                value={formData.feb}
                                checked={formData.feb}
                                onChange={handleChange}
                            />
                            <Label className="btn btn-outline-primary" htmlFor="feb">Feb</Label>
                            <Input
                                className="btn-check"
                                autoComplete="off"
                                id="mar"
                                name="mar"
                                placeholder="mar"
                                type="checkbox"
                                value={formData.mar}
                                checked={formData.mar}
                                onChange={handleChange}
                            />
                            <Label className="btn btn-outline-primary" htmlFor="mar">Mar</Label>
                            <Input
                                className="btn-check"
                                autoComplete="off"
                                id="apr"
                                name="apr"
                                placeholder="apr"
                                type="checkbox"
                                value={formData.apr}
                                checked={formData.apr}
                                onChange={handleChange}
                            />
                            <Label className="btn btn-outline-primary" htmlFor="apr">Apr</Label>
                            <Input
                                className="btn-check"
                                autoComplete="off"
                                id="may"
                                name="may"
                                placeholder="may"
                                type="checkbox"
                                value={formData.may}
                                checked={formData.may}
                                onChange={handleChange}
                            />
                            <Label className="btn btn-outline-primary" htmlFor="may">May</Label>
                            <Input
                                className="btn-check"
                                autoComplete="off"
                                id="jun"
                                name="jun"
                                placeholder="jun"
                                type="checkbox"
                                value={formData.jun}
                                checked={formData.jun}
                                onChange={handleChange}
                            />
                            <Label className="btn btn-outline-primary" htmlFor="jun">Jun</Label>
                            <br />
                            <Input
                                className="btn-check"
                                autoComplete="off"
                                id="jul"
                                name="jul"
                                placeholder="jul"
                                type="checkbox"
                                value={formData.jul}
                                checked={formData.jul}
                                onChange={handleChange}
                            />
                            <Label className="btn btn-outline-primary" htmlFor="jul">Jul</Label>
                            <Input
                                className="btn-check"
                                autoComplete="off"
                                id="aug"
                                name="aug"
                                placeholder="aug"
                                type="checkbox"
                                value={formData.aug}
                                checked={formData.aug}
                                onChange={handleChange}
                            />
                            <Label className="btn btn-outline-primary" htmlFor="aug">Aug</Label>
                            <Input
                                className="btn-check"
                                autoComplete="off"
                                id="sep"
                                name="sep"
                                placeholder="sep"
                                type="checkbox"
                                value={formData.sep}
                                checked={formData.sep}
                                onChange={handleChange}
                            />
                            <Label className="btn btn-outline-primary" htmlFor="sep">Sep</Label>
                            <Input
                                className="btn-check"
                                autoComplete="off"
                                id="oct"
                                name="oct"
                                placeholder="oct"
                                type="checkbox"
                                value={formData.oct}
                                checked={formData.oct}
                                onChange={handleChange}
                            />
                            <Label className="btn btn-outline-primary" htmlFor="oct">Oct</Label>
                            <Input
                                className="btn-check"
                                autoComplete="off"
                                id="nov"
                                name="nov"
                                placeholder="nov"
                                type="checkbox"
                                value={formData.nov}
                                checked={formData.nov}
                                onChange={handleChange}
                            />
                            <Label className="btn btn-outline-primary" htmlFor="nov">Nov</Label>
                            <Input
                                className="btn-check"
                                autoComplete="off"
                                id="dec"
                                name="dec"
                                placeholder="dec"
                                type="checkbox"
                                value={formData.dec}
                                checked={formData.dec}
                                onChange={handleChange}
                            />
                            <Label className="btn btn-outline-primary" htmlFor="dec">Dec</Label>
                        </FormGroup>
                    </Col>
                    <Button>Save Changes</Button>
                </Form>
            </div>
        </div>
    ) : null;
}

export default Plant;