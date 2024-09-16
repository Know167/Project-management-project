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
                <div
                    className="container row row-cols-1 row-cols-md-1"
                    style={{
                        background: "rgba(255,255,255,.7)",
                        maxWidth: "100%",
                        // padding: "0px",
                        margin:'0px'
                    }}>
                    {data.projects.map((project) => {
                        return (
                            <div
                                className="container shadow-sm ps-5 py-2"
                                style={{
                                    background: "rgba(255,255,255,.7)",
                                    maxWidth:'100%'
                                }}
                                key={project.id}>
                                <a
                                    className="fw-bold fs-4 text-info-emphasis text-decoration-none"
                                    href={`/projects/${project.id}`}>
                                    {project.name}
                                </a>
                                <div className="text-secondary">
                                    status:
                                    <strong className="ms-1">
                                        {project.status}
                                    </strong>
                                </div>

                                <div className="text-success mt-2">
                                    by
                                    <i className="ms-1 fw-semibold">
                                        {project.client.name}
                                    </i>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default Projects;
