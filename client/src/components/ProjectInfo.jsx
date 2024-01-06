import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { GET_PROJECT } from "../queries/ProjectQueries";
import Spinner from "./Spinner";
import EditProject from "./EditProject";

const ProjectInfo = () => {
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PROJECT, {
        variables: { id },
    });

    const onCancel = () => {
        setEdit(false);
}

    if (loading) <Spinner />;
    if (error) <p>Something Somewhere Went Sideways</p>;
    return (
        <>
            {!loading && !error && data && (
                <div className="container mt-4">
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/projects")}>
                        <AiOutlineArrowLeft className="me-2" /> Go to Projects
                    </button>
                    <div
                        className="card border-primary mt-3"
                        style={{ backgroundColor: "#E8F0FF" }}>
                        <div className="card-body">
                            <h2 className="card-title text-primary">
                                {data.project.name}
                            </h2>
                            <p className="card-text">
                                <strong>Status:</strong>{" "}
                                <span
                                    className={`badge bg-${
                                        data.project.status === "Not Started"
                                            ? "danger"
                                            : data.project.status ===
                                              "In Progress"
                                            ? "warning"
                                            : "success"
                                    }`}>
                                    {data.project.status}
                                </span>
                            </p>
                            <p className="card-text">
                                <strong>Description:</strong>{" "}
                                {data.project.description}
                            </p>
                            <ul className="list-group">
                                <li className="list-group-item card-text">
                                    <strong>Client:</strong>{" "}
                                    {data.project.client.name}
                                </li>
                                <li className="list-group-item card-text">
                                    <strong>Phone:</strong>{" "}
                                    {data.project.client.phone}
                                </li>
                                <li className="list-group-item card-text">
                                    <strong>Email:</strong>{" "}
                                    {data.project.client.email}
                                </li>
                            </ul>
                        </div>
                        <button className="btn btn-warning ms-auto me-2 mb-2" onClick={() => setEdit(true)}>
                            Edit
                        </button>
                    </div>
                </div>
                
            )}
            {edit&&<EditProject data={data} onCancel={onCancel}/>}
        </>
    );
};

export default ProjectInfo;
