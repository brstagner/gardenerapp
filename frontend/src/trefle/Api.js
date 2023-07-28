import axios from "axios";
import config from "../config.json";

const BASE_URL = process.env.NODE_ENV === "production" ?
    config.GARDENER_PROD_SERVER_BASE_URL :
    config.GARDENER_DEV_SERVER_BASE_URL || "http://localhost:3000";

class Api {

    /** Search for a plant */
    static async plantSearch (name, color, months) {
        let res = await axios.post(`${BASE_URL}trefle/search`, { name, color, months });
        return { plants: res.data.data, pages: res.data.links };
    }

    /** Get first, previous, next, or last page of results */
    static async plantPage (link) {
        let res = await axios.post(`${BASE_URL}trefle/page`, { link });
        return { plants: res.data.data, pages: res.data.links };
    }

    /** Get details on a plant by plant_id */
    static async getSpecies (species_id) {
        let res = await axios.post(`${BASE_URL}trefle/species`, { species_id: +species_id });
        return res.data.data;
    }
}

export default Api;