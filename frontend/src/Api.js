import axios from "axios";
import config from "./config.json";

const BASE_URL = process.env.NODE_ENV === "production" ?
    config.GARDENER_PROD_SERVER_BASE_URL :
    config.GARDENER_DEV_SERVER_BASE_URL || "http://localhost:3000";

/**
 *  Static class for Gardener database requests
 */

class Api {

    /** Get all users */
    static async getUsers (token) {
        try {
            let res = await axios.get(`${BASE_URL}users`,
                { headers: { Authorization: token } }
            );
            return res.data.users;
        }
        catch (error) {
            let message = error.response.data.error.message;
            throw message;
        }
    }

    /** Get details on a user by user_id. */
    static async getUser (user_id, token) {
        try {
            let res = await axios.get(`${BASE_URL}users/${user_id}`,
                { headers: { Authorization: token } }
            );
            return res.data.user;
        }
        catch (error) {
            let message = error.response.data.error.message;
            throw message;
        }
    }

    /** Add a new user to database */
    static async addUser (user) {
        try {
            const res = await axios.post(`${BASE_URL}auth/register`, user
                // ,
                // { headers: { Authorization: token } }
            );
            console.log(res);
            return res;
        }
        catch (error) {
            let message = error.response.data.error.message;
            throw message;
        }
    }

    /** Login a user, get a token */
    static async loginUser (user) {
        try {
            const res = await axios.post(`${BASE_URL}auth/token`, user
                // ,
                // { headers: { Authorization: token } }
            );
            return res;
        }
        catch (error) {
            // let message = error.response.data.error.message;
            // throw message;
            console.log(error);
        }
    }

    /** Update user information */
    static async editUser (user_id, user, token) {
        try {
            const res = await axios.patch(`${BASE_URL}users/${user_id}`, user,
                { headers: { Authorization: token } }
            );
            return res;
        }
        catch (error) {
            // let message = error.response.data.error.message;
            // throw message;
            console.log(error);
        }
    }

    /** Delete a user */
    static async deleteUser (user_id, token) {
        try {
            await axios.delete(
                `${BASE_URL}users/${user_id}`,
                {
                    headers: { Authorization: token }
                });
            return "deleted";
        }
        catch (error) {
            console.log(error);
        }
    }

    // Plant Routes

    /** Get all plants */
    static async getAllPlants (token) {
        try {
            let res = await axios.get(`${BASE_URL}plants/all`,
                { headers: { Authorization: token } });
            return res.data.plants;
        }
        catch (error) {
            let message = error.response.data.error.message;
            throw message;
        }
    }

    /** Get user's plants */
    static async getUserPlants (token) {
        try {
            let res = await axios.get(`${BASE_URL}plants/collection`,
                { headers: { Authorization: token } }
            );
            return res.data.plants;
        }
        catch (error) {
            // let message = error.response.data.error.message;
            // throw message;
            console.log(error);
        }
    }

    /** Get details on a plant by plant_id. */
    static async getPlant (plant_id, token) {
        try {
            let res = await axios.get(
                `${BASE_URL}plants/${plant_id}`,
                { headers: { Authorization: token } });
            console.log(res);
            return res.data;
        }
        catch (error) {
            let message = error.response.data.error.message;
            throw message;
        }
    }

    /** Add a new plant to database */
    static async addPlant (plant, token) {
        try {
            await axios.post(
                `${BASE_URL}plants`,
                plant,
                { headers: { Authorization: token } });
            return "success";
        }
        catch (errors) {
            return `error: ${errors}`;
        }
    }

    /** Update plant information */
    static async editPlant (plant_id, plant, token) {
        try {
            await axios.patch(
                `${BASE_URL}plants/${plant_id}`,
                plant,
                { headers: { Authorization: token } });
            return "success";
        }
        catch (errors) {
            return `error: ${errors}`;
        }
    }

    /** Delete a plant */
    static async deletePlant (plant_id, userId, token) {
        try {
            await axios.delete(
                `${BASE_URL}plants/${plant_id}`,
                {
                    headers: { Authorization: token },
                    data: { userId: userId }
                });
            return "deleted";
        }
        catch (error) {
            console.log(error);
        }
    }

    // Garden Routes

    /** Get all gardens */
    static async getAllGardens (token) {
        try {
            let res = await axios.get(`${BASE_URL}gardens/all`,
                { headers: { Authorization: token } });
            return res.data.gardens;
        }
        catch (error) {
            let message = error.response.data.error.message;
            throw message;
        }
    }

    /** Get user's gardens */
    static async getUserGardens (token) {
        try {
            let res = await axios.get(`${BASE_URL}gardens/collection`,
                { headers: { Authorization: token } });
            return res.data.gardens;
        }
        catch (error) {
            let message = error.response.data.error.message;
            throw message;
        }
    }

    /** Get details on a garden by garden_id. */
    static async getGarden (garden_id, token) {
        try {
            let res = await axios.get(
                `${BASE_URL}gardens/${garden_id}`,
                { headers: { Authorization: token } });
            return res.data;
        }
        catch (error) {
            let message = error.response.data.error.message;
            throw message;
        }
    }

    /** Add a new garden to database */
    static async addGarden (garden, token) {
        try {
            await axios.post(
                `${BASE_URL}gardens`,
                garden, { headers: { Authorization: token } });
            return "success";
        }
        catch (error) {
            let message = error.response.data.error.message;
            throw message;
        }
    }

    /** Update garden information */
    static async editGarden (garden_id, garden, token) {
        try {
            let name = garden.name;
            let grid = garden.grid;
            let user_id = garden.user_id;
            await axios.patch(
                `${BASE_URL}gardens/${garden_id}`,
                { user_id, name, grid },
                { headers: { Authorization: token } });
            return "success";
        }
        catch (error) {
            let message = error.response.data.error.message;
            throw message;
        }
    }

    /** Delete a garden */
    static async deleteGarden (garden_id, userId, token) {
        try {
            await axios.delete(
                `${BASE_URL}gardens/${garden_id}`,
                {
                    headers: { Authorization: token },
                    data: { userId: userId }
                }
            );
            return "deleted";
        }
        catch (error) {
            // let message = error.response.data.error.message;
            // throw message;
            console.log(error);
        }
    }
}

export default Api;