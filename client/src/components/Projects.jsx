import { useQuery } from "@apollo/client";

import { GET_PROJECTS } from "../queries/ProjectQueries";
import ProjectRow from "./ProjectRow";
import Spinner from "./Spinner";

const Projects = () => {
    const { loading, error, data } = useQuery(GET_PROJECTS);
    if (loading) <Spinner />;
    if (error) <p>Something went wrong!</p>;
    return (
        <>
            {!loading && !error && (
                <div>
                    <table className="table table-dark table-hover mt-3">
                        <caption>list of projects</caption>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Client</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {data.projects.map((rowData) => (
                                <ProjectRow key={rowData.id} rowData={rowData} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default Projects;
