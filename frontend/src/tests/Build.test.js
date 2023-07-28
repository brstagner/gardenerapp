import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GardenBuilder from '../gardens/build/GardenBuilder';

const user = { username: "user", userId: "1", isAdmin: "false", token: "user-token" };
const admin = { username: "admin", userId: "2", isAdmin: "true", token: "admin-token" };

// smoke test
it("renders without crashing", function () {
    render(
        <BrowserRouter>
            <GardenBuilder currUser={user} />
        </BrowserRouter>
    );
    // screen.debug;
});

// snapshot test
it("matches snapshot", function () {
    const { asFragment } = render(
        <BrowserRouter>
            <GardenBuilder currUser={user} />
        </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});

// buttons
describe("has functional buttons", () => {
    it("adds rows", async function () {
        render(
            <BrowserRouter>
                <GardenBuilder currUser={user} />
            </BrowserRouter>
        );
        const addRow = screen.getByTestId('row-increment');
        fireEvent.click(addRow);
        await waitFor(() =>
            expect(screen.getByText("Rows: 2")).toBeInTheDocument());
    });
    it("deletes rows", async function () {
        render(
            <BrowserRouter>
                <GardenBuilder currUser={user} />
            </BrowserRouter>
        );
        const addRow = screen.getByTestId('row-increment');
        fireEvent.click(addRow);
        const deleteRow = screen.getByTestId('row-decrement');
        fireEvent.click(deleteRow);
        await waitFor(() =>
            expect(screen.getByText("Rows: 1")).toBeInTheDocument());
    });
    it("adds columns", async function () {
        render(
            <BrowserRouter>
                <GardenBuilder currUser={user} />
            </BrowserRouter>
        );
        const addCol = screen.getByTestId('col-increment');
        fireEvent.click(addCol);
        await waitFor(() =>
            expect(screen.getByText("Columns: 2")).toBeInTheDocument());
    });
    it("deletes columns", async function () {
        render(
            <BrowserRouter>
                <GardenBuilder currUser={user} />
            </BrowserRouter>
        );
        const addCol = screen.getByTestId('col-increment');
        fireEvent.click(addCol);
        const deleteCol = screen.getByTestId('col-decrement');
        fireEvent.click(deleteCol);
        await waitFor(() =>
            expect(screen.getByText("Columns: 1")).toBeInTheDocument());
    });
});
