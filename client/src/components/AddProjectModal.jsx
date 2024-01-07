import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";


import { GET_CLIENTS } from "../queries/ClientQueries";
import { GET_PROJECTS } from "../queries/ProjectQueries";
import { ADD_PROJECT } from "../queries/mutations/ProjectMutations";

const AddProjectModal = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Not Started");

    const { loading, error, data } = useQuery(GET_CLIENTS);

    const [clientId, setClientId] = useState("");

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: {
            name: name,
            description: description,
            status: status,
            clientId: clientId,
        },
        update(cache, { data: { addProject } }) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });
            cache.writeQuery({
                query: GET_PROJECTS,
                data: {
                    projects: { ...projects, addProject },
                },
            });
        },
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (
            name.length === 0 ||
            description.length === 0 ||
            clientId.length === 0
        ) {
            return alert("Fields cannot be empty!");
        }
        addProject(name, status, description, clientId);
        setName("");
        setDescription("");
        setClientId("");
        setStatus("Not Started");
    };
    const onChangeName = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };
    const onChangeDescription = (e) => {
        e.preventDefault();
        setDescription(e.target.value);
    };
    const onChangeStatus = (e) => {
        e.preventDefault();
        setStatus(e.target.value);
    };
    const onChangeClient = (e) => {
        e.preventDefault();
        setClientId(e.target.value);
    };

    return (
        <>
            {!loading && !error && (
                <>
                    <div
                        className="btn border border-3 border-dark mb-2 fw-medium text-tertiary shadow"
                        style={{ backgroundColor: "#E3E1DA" }}
                        data-bs-toggle="modal"
                        data-bs-target="#addProjectModal">
                        <FaPlus/> Add Project
                    </div>
                    <form className="">
                        <div
                            className="modal fade"
                            id="addProjectModal"
                            tabIndex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1
                                            className="modal-title fs-5"
                                            id="modalTitle">
                                            Add new Project
                                        </h1>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label
                                                htmlFor="name"
                                                className="form-label">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                value={name}
                                                onChange={onChangeName}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label
                                                htmlFor="description"
                                                className="form-label">
                                                Description
                                            </label>
                                            <input
                                                type="text-area"
                                                className="form-control"
                                                id="description"
                                                value={description}
                                                onChange={onChangeDescription}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label
                                                htmlFor="status"
                                                className="form-label">
                                                Status
                                            </label>
                                            <select
                                                type="text"
                                                className="form-select"
                                                id="status"
                                                value={status}
                                                onChange={onChangeStatus}>
                                                <option value={""}>
                                                    --Select Status--
                                                </option>
                                                <option value="Not Started">
                                                    Not Started
                                                </option>
                                                <option value="In Progress">
                                                    In Progress
                                                </option>
                                                <option value="Completed">
                                                    Completed
                                                </option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label
                                                htmlFor="client"
                                                className="form-label">
                                                Client
                                            </label>
                                            <select
                                                name="client"
                                                id="client"
                                                className="form-select"
                                                value={clientId}
                                                onChange={onChangeClient}>
                                                <option value={""}>
                                                    --Select Client--
                                                </option>
                                                {data.clients.map((client) => (
                                                    <option value={client.id}>
                                                        {client.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-orange text-tertiary fw-normal"
                                            data-bs-dismiss="modal">
                                            Close
                                        </button>
                                        <button
                                            className="btn btn-blue text-tertiary fw-normal"
                                            onClick={onSubmit}>
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </>
            )}
        </>
    );
};

export default AddProjectModal;
