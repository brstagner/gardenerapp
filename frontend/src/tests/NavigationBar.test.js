import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavigationBar from '../NavigationBar';

const user = { username: "user", userId: "1", isAdmin: "false", token: "user-token" };
const admin = { username: "admin", userId: "2", isAdmin: "true", token: "admin-token" };

// smoke test
it("renders without crashing", function () {
    render(
        <BrowserRouter >
            <NavigationBar currUser={user} />
        </BrowserRouter >);
    // screen.debug()
});

// snapshot test as non-admin user
it("matches snapshot for non-admin user", function () {
    const { asFragment } = render(
        <BrowserRouter >
            <NavigationBar currUser={user} />
        </BrowserRouter >);
    expect(screen.queryAllByText("Admin")).toHaveLength(0);
    expect(asFragment()).toMatchSnapshot();
});

// snapshot test as admin
it("matches snapshot for admin", function () {
    const { asFragment } = render(
        <BrowserRouter>
            <NavigationBar currUser={admin} />
        </BrowserRouter>);
    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
});