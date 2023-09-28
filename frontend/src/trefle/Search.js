import React from "react";
import { useState } from "react";
import { Form, FormGroup, Col, Input, Label, Button } from "reactstrap";
import Api from "./Api";
import Page from "./Page";
import PlantSelectionDialog from "../plants/PlantSelectionDialog";
import "../css/forms.css";
import "../css/build.css";

function Search ({ handlePlantSelect }) {

    // Initial form data includes all months set to false, updated by checkboxes
    const [formData, setFormData] = useState({ 'jan-search': false, 'feb-search': false, 'mar-search': false, 'apr': false, 'may': false, 'jun': false, 'jul': false, 'aug': false, 'sep': false, 'oct': false, 'nov': false, 'dec': false });

    // Current page of search results
    const [currentPage, setCurrentPage] = useState(1);

    // Trefle API links to first, previous, next, and last pages of results
    const [pages, setPages] = useState();

    // Currently rendered plants returned by search
    const [plants, setPlants] = useState([]);

    // "loading..." or "no matches found"
    const [message, setMessage] = useState();

    /** Call plantSearch with formData */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Empty plants triggers message
        setPlants([]);

        // A new search result starts at the first page
        setCurrentPage(1);

        // Renders loading message until result returned
        setMessage('loading...');

        // Collects only months with a value 'true', name/color conditions
        // added in case user enters 'true' string into those fields
        let months = [];
        for (const [key, value] of Object.entries(formData)) {
            if (value === true && value !== ('name' || 'color')) {
                months.push(key);
            };
        }

        // Sends search criteria to frontend Trefle API middleware
        const res = await Api.plantSearch(
            formData.name,
            formData.color,
            months
        );

        // First page of plant results
        setPlants(res.plants);

        // Pagination API links
        setPages(res.pages);

        // If no results returned
        if (!plants.length) setMessage('No matches found');
    };

    /** Handles search form updates */
    const handleChange = (e) => {
        // Handles months
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
        // Handles everything else
        else {
            setFormData((data) => ({
                ...data,
                [e.target.name]: e.target.value,
            }));
        }
    };

    /** Pagination skips a new search, just sends relevent link to Trefle API */
    const handlePage = async (link, newPage) => {
        setPlants([]);
        setMessage('loading...');
        const res = await Api.plantPage(link);
        setPlants(res.plants);
        setCurrentPage(newPage);
        setPages(res.pages);
    };

    return (
        <div>
            <h6>Search for a Plant</h6>
            <div className="container">
                <div className="row">
                    <Form style={{ margin: "1em" }} onSubmit={handleSubmit}>
                        <Col>
                            <FormGroup floating>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="name"
                                    type="text"
                                    autoComplete="name"
                                    value={undefined}
                                    onChange={handleChange}
                                />
                                <Label htmlFor="common_name">Common or Scientific Name</Label>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup floating>
                                <Input
                                    id="color"
                                    name="color"
                                    placeholder="color"
                                    type="text"
                                    onChange={handleChange}
                                />
                                <Label htmlFor="color">Bloom Color</Label>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                Bloom Months<br />
                                <Input
                                    key="jan-search-input"
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
                        <Button>Search</Button>
                    </Form>
                </div>
                <div className="row">
                    {plants.length ?
                        <ul>
                            <h6>Select a result to add its information to the submission form</h6>
                            {plants.map(plant =>
                                // <li key={plant.slug}
                                //     id={plant.id}
                                //     className="plant-div"
                                //     onClick={handlePlantSelect}
                                //     style={{ cursor: "pointer" }}
                                // >
                                //     {plant.common_name} ({plant.scientific_name})
                                // </li>
                                <PlantSelectionDialog plant={plant} />
                            )}
                        </ul> :
                        <div>{message}</div>}
                    {plants.length ?
                        <Page
                            currentPage={currentPage}
                            pages={pages}
                            handlePage={handlePage}
                        /> :
                        null}
                </div>
            </div>
        </div>
    );
}

export default Search;