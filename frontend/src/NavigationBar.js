import { NavLink, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'popper.js/dist/popper.min.js';
import './css/nav.css';


const NavigationBar = ({ currUser, logout }) => {

    const nav = useNavigate();

    const handleLogout = () => {
        logout();
        nav('/');
    };

    const admin =
        <div className="dropdown d-flex justify-content-center">
            <button
                className="btn btn-link nav-link dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                Admin
            </button>
            <ul className="dropdown-menu">
                <li>
                    <NavLink
                        className="nav-link text-black"
                        to="/users">
                        User List
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="nav-link text-black"
                        to="/gardens/all">
                        Garden List
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="nav-link text-black"
                        to="/plants/all">
                        Plant List
                    </NavLink>
                </li>
            </ul>
        </div>;

    return (
        <nav className="navbar navbar-expand-sm navbar-custom">
            <a className="navbar-brand mb-0 h1 fs-2" href="/">Gardener</a>
            {currUser ? (
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>) : null}
            {currUser ? (
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink
                                className="btn btn-link nav-link"
                                to="/profile">
                                Profile ({currUser.username})
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="btn btn-link nav-link"
                                to="/gardens">
                                Gardens
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="btn btn-link nav-link"
                                to="/plants">
                                Plants
                            </NavLink>
                        </li>
                        {currUser.isAdmin === "true" ? admin : null}
                        <li className="nav-item d-flex justify-content-center">
                            <button
                                className="btn btn-link nav-link"
                                onClick={handleLogout}>
                                Log Out
                            </button>
                        </li>
                    </ul>
                </div>) :
                null
            }
        </nav>
    );
};

export default NavigationBar;