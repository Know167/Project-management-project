import { Link } from "react-router-dom"; 

const Home = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 text-center">
                    <h1>Welcome to Your Project Management App</h1>
                    <p className="lead">
                        Manage your projects efficiently and stay organized with
                        our app.
                    </p>
                    <div className="mt-4">
                        <Link to="/projects" className="btn btn-blue me-2 text-white shadow-sm">
                            View Projects
                        </Link>
                        <Link to="/add-project" className="btn btn-success shadow-sm">
                            Add New Project
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
