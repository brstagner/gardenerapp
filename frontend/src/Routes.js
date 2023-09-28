import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavigationBar from "./NavigationBar";
import Home from "./Home";
import Register from "./user/Register";
import LogIn from "./user/LogIn";

import SignIn from "./SignIn";
import UserList from "./admin/UserList";
import Profile from "./user/Profile";
import Plants from "./plants/Plants";
import Plant from "./plants/Plant";

import EditPlant from "./plants/EditPlant";
import NewPlant from "./plants/NewPlant";
import Gardens from "./gardens/Gardens";
import GardenList from "./admin/GardenList";
import PlantList from "./admin/PlantList";
import GardenBuilder from "./gardens/build/GardenBuilder";
import Display from "./gardens/display/Display";
import MUIDisplay from "./gardens/display/MUIDisplay";

import Search from "./plants/Search";

import NavBar from "./NavBar";

function FrontRoutes ({
    currUser,
    login,
    logout,
    register,
    editProfile
}) {

    return (
        <BrowserRouter>
            <NavBar currUser={currUser} logout={logout} />
            <main>
                {currUser ? (
                    <Routes>
                        <Route path="*" element={<Home login={login} register={register} currUser={currUser} />} />
                        <Route path="/" element={
                            <Home login={login} register={register}
                                currUser={currUser}
                            />} />
                        <Route path="/profile" element={
                            <Profile
                                currUser={currUser}
                                editProfile={editProfile}
                            />} />
                        <Route path="/plants" element={
                            <Plants
                                currUser={currUser}
                            />} />
                        <Route path="/plants/all" element={
                            <PlantList
                                currUser={currUser}
                            />} />
                        <Route path="/plants/new" element={
                            <NewPlant
                                currUser={currUser}
                            />} />

                        <Route path="/search" element={
                            <Search currUser={currUser} />} />


                        <Route path="/plants/:plant_id" element={
                            <EditPlant
                                currUser={currUser}
                            />} />
                        <Route path="/gardens" element={
                            <Gardens
                                currUser={currUser}
                            />} />
                        <Route path="/gardens/all" element={
                            <GardenList
                                currUser={currUser}
                            />} />
                        <Route path="/gardens/new" element={
                            <GardenBuilder
                                currUser={currUser}
                                method={"post"}
                            />} />
                        <Route path="/gardens/edit/:garden_id" element={
                            <GardenBuilder
                                currUser={currUser}
                                method={"patch"}
                            />} />
                        <Route path="/gardens/:garden_id" element={
                            <MUIDisplay
                                currUser={currUser}
                            />} />
                        <Route path="/users" element={
                            <UserList
                                currUser={currUser}
                            />} />
                        {/* <Route path="*" element={
                            <Home
                                currUser={currUser}
                            />} /> */}
                    </Routes>
                ) : (
                    <Routes>
                        <Route path="*" element={<Home login={login} register={register} />} />
                        <Route path="/" element={
                            <Home login={login} register={register} />} />
                        {/* <Route path="/register" element={
                            <Register
                                register={register}
                            />} />
                        <Route path="/login" element={
                            <SignIn
                                login={login}
                            />} /> */}
                    </Routes>
                )}
            </main>
        </BrowserRouter>
    );
}

export default FrontRoutes;