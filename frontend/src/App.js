import { useState, useEffect } from 'react';
import Api from './Api';
import Routes from "./Routes";
import './css/app.css';

function App () {

  const [currUser, setCurrUser] = useState();

  useEffect(() => {
    setCurrUser({
      username: localStorage.username,
      userId: localStorage.userId,
      isAdmin: localStorage.isAdmin,
      token: localStorage.token
    });
  }, []);

  /** Login an existing user */
  async function login (user) {
    try {
      localStorage.clear();
      setCurrUser();
      const res = await Api.loginUser(user);
      setCurrUser({
        username: res.data.username,
        userId: res.data.user_id,
        isAdmin: res.data.is_admin || false,
        token: res.data.token
      });
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("userId", res.data.user_id);
      localStorage.setItem("isAdmin", res.data.is_admin);
      localStorage.setItem("token", res.data.token);
    } catch (errors) {
      console.log(errors);
    }
  }

  /** Register a new user, login that user */
  async function register (user) {
    try {
      localStorage.clear();
      setCurrUser();
      const res = await Api.addUser(user);
      setCurrUser({
        username: res.data.username,
        userId: res.data.user_id,
        isAdmin: res.data.is_admin || false,
        token: res.data.token
      });
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("userId", res.data.user_id);
      localStorage.setItem("isAdmin", res.data.is_admin);
      localStorage.setItem("token", res.data.token);
    } catch (errors) {
      console.log(errors);
    }
  }

  /** Logout current user, clear state and localStorage */
  const logout = () => {
    localStorage.clear();
    setCurrUser();
  };

  return (
    <div className="App">
      <Routes
        currUser={currUser}
        login={login}
        logout={logout}
        register={register}
      />
    </div>
  );
}

export default App;
