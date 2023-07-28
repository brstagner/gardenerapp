import { NavLink } from "react-router-dom";
import { Alert } from "reactstrap";

function Home ({ currUser }) {

    return (
        <div className="container">
            {currUser ?
                <h4>Welcome to the Gardener App.</h4> :
                <div className="container">
                    <div className="row gy-5">
                        <div className="col">
                            <div className="p-3">
                                <h4 className="d-flex justify-content-center">
                                    Have an account?
                                </h4>
                                <div className="d-flex justify-content-center">
                                    <NavLink className="btn btn-primary d-inline-block" to="/login">
                                        Login
                                    </NavLink>
                                </div>
                            </div>
                            <div className="p-3"></div>
                            <div className="p-3">
                                <h4 className="d-flex justify-content-center">
                                    New user?
                                </h4>
                                <div className="d-flex justify-content-center">
                                    <NavLink className="btn btn-primary d-inline-block" to="/register">
                                        Register
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Home;