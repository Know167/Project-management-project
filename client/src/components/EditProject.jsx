import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useMutation } from "@apollo/client";

import { UPDATE_PROJECT } from "../queries/mutations/ProjectMutations";
import { GET_PROJECT } from "../queries/ProjectQueries";

const EditProject = ({ data, onCancel }) => {
    // console.log(data)
    const [name, setName] = useState(data.project.name);
    const [status, setStatus] = useState(data.project.status);
    const [description, setDescription] = useState(data.project.description);

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: {
            id: data.project.id,
            name,
            status,
            description,
        },
        refetchQueries: [
            { query: GET_PROJECT, variables: { id: data.project.id } },
        ],
    });

    return (
        <div className="container mt-4">
            <div className="card border-primary">
                <div className="card-body">
                    <h2 className="card-title text-primary">Update Project</h2>

                    <div className="mb-3">
                        <label htmlFor="projectName" className="form-label">
                            Project Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="projectName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">
                            Status
                        </label>
                        <select
                            className="form-select"
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}>
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            className="form-control"
                            id="description"
                            rows="3"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }></textarea>
                    </div>

                    <button
                        className="btn btn-primary me-2"
                        onClick={() => {
                            updateProject(
                                data.project.id,
                                name,
                                status,
                                description
                            );
                            onCancel();
                        }}>
                        Update
                    </button>

                    <button className="btn btn-secondary" onClick={onCancel}>
                        <AiOutlineArrowLeft className="me-2" /> Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProject;
