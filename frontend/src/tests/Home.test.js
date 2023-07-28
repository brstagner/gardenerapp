import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';

const user = { username: "user", userId: "1", isAdmin: "false", token: "user-token" };
const admin = { username: "admin", userId: "2", isAdmin: "true", token: "admin-token" };

// smoke test
it("renders without crashing", function () {
    render(
        <BrowserRouter >
            <Home />
        </BrowserRouter >);
    // screen.debug()
});

// snapshot test
it("matches snapshot for no logged-in user", function () {
    const { asFragment } = render(
        <BrowserRouter >
            <Home />
        </BrowserRouter >);
    expect(screen.getByText("New user?")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
});

// snapshot test
it("matches snapshot for logged-in user", function () {
    const { asFragment } = render(
        <BrowserRouter>
            <Home currUser={user} />
        </BrowserRouter>);
    expect(screen.getByText("Welcome to the Gardener App.")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
});