import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../Api";

// List of all users, viewable by admins, with delete
function UserList ({ currUser }) {
    const nav = useNavigate();
    const [users, setUsers] = useState([]);

    async function getUsers () {
        try {
            let userRes = await Api.getUsers(currUser.token);
            setUsers(userRes);
        }
        catch (error) {
            console.log(error);
            nav('/');
        }
    }

    useEffect(() => {
        getUsers();
        // cut dependency array
        // }, []);
    });

    const deleteUser = async (user_id) => {
        try {
            await Api.deleteUser(user_id, currUser.token);
            getUsers();
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "left",
                    flexWrap: "wrap",
                }}>
                {users.map(user => (
                    <div key={user.user_id} style={{ padding: "5px" }}>
                        user_id: {user.user_id}<br />
                        username: {user.username}<br />
                        email: {user.email}<br />
                        <button onClick={() => { deleteUser(user.user_id); }}>Delete User</button>
                    </div>))}
            </div>
        </div>
    );
}

export default UserList;