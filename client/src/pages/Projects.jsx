import { useQuery } from "@apollo/client";

import { GET_PROJECTS } from "../queries/ProjectQueries";
import Spinner from "../components/Spinner";
import AddProjectModal from "../components/AddProjectModal";

const Projects = () => {
    const { loading, error, data } = useQuery(GET_PROJECTS);
    if (loading) <Spinner />;
    if (error) <p>Something went wrong!</p>;
    if (!data || !data.projects) {
        <p>No Projects:(</p>;
    }
    return (
        <>
            <AddProjectModal />
            {!loading && !error && (
                <div className="row row-cols-1 row-cols-md-1">
                    {data.projects.map((project) => {
                        return (
                            <div
                                className="card d-flex flex-row shadow-sm m-1"
                                key={project.id}>
                                <div className="card-body">
                                    <a className="card-title fw-bold fs-4 text-info-emphasis text-decoration-none" href={`/projects/${project.id}`}>
                                        {project.name}
                                    </a>
                                    <div className="text-secondary">
                                        status:
                                        <strong className="mx-1">
                                            {project.status}
                                        </strong>
                                    </div>
                                    <div className="text-success mt-2">
                                        by
                                        <i className="mx-1 fw-semibold">
                                            {project.client.name}
                                        </i>
                                    </div>
                                </div>
                                {/* <a
                                    className="btn btn-lg text-primary-emphasis my-auto border border-2 border-tertiary shadow-sm"
                                    style={{ backgroundColor: "#c9ffff" }}
                                    href={`/projects/${project.id}`}>
                                    View
                                </a> */}
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default Projects;
