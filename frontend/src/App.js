import { useState, useEffect } from 'react';
import Api from './Api';
import Routes from "./Routes";
import './css/app.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';


function App () {

  const [currUser, setCurrUser] = useState();

  useEffect(() => {
    if ("username" in localStorage && localStorage.username !== undefined) {
      setCurrUser({
        username: localStorage.username,
        userId: localStorage.userId,
        isAdmin: localStorage.isAdmin,
        token: localStorage.token
      });
    }
    else setCurrUser();

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
      return res;
    } catch (errors) {
      console.log(errors);
    }
  }

  /** Update user profile */
  async function editProfile (data) {
    try {
      const res = await Api.editUser(currUser.userId, data, currUser.token);
      console.log(res.data.user);
      localStorage.setItem("username", res.data.user.username);
      localStorage.setItem("userId", res.data.user.user_id);
      localStorage.setItem("isAdmin", res.data.user.is_admin);
      localStorage.setItem("token", res.data.user.token);
      setCurrUser({
        ...currUser,
        username: res.data.user.username,
        userId: res.data.user.user_id,
        isAdmin: res.data.user.is_admin || false
      });
      return "success";
    } catch (error) {
      // setErrors(errors);
      // return `error: ${errors}`;
      console.log(error);
    }
  }

  /** Logout current user, clear state and localStorage */
  const logout = () => {
    localStorage.clear();
    setCurrUser();
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes
          currUser={currUser}
          login={login}
          logout={logout}
          register={register}
          editProfile={editProfile}
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
