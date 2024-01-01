import { useMutation } from "@apollo/client";

import { FaTrashAlt } from "react-icons/fa";
import { REMOVE_PROJECT } from "../queries/mutations/ProjectMutations";
import { GET_PROJECTS } from "../queries/ProjectQueries";
// import { GET_CLIENT } from "../queries/ClientQueries";

const ProjectRow = ({ rowData }) => {
    const [removeProject] = useMutation(REMOVE_PROJECT, {
        variables: { id: rowData.id },
        update(cache, { data: { removeProject } }) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });
            cache.writeQuery({
                query: GET_PROJECTS,
                data: {
                    projects: projects.filter(
                        (project) => project.id !== removeProject.id
                    ),
                },
            });
        },
    });
    return (
        <tr>
            <td>{rowData.name}</td>
            <td>{rowData.status}</td>
            <td>{rowData.client.name}</td>
            <td className="text-center align-middle">
                <button className="btn btn-sm" onClick={removeProject}>
                    <FaTrashAlt color="#FF674D" />
                </button>
            </td>
        </tr>
    );
};

export default ProjectRow;
