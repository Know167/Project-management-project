import { useMutation } from "@apollo/client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

import { ADD_CLIENT } from "../queries/mutations/ClientMutations";
import { GET_CLIENTS } from "../queries/ClientQueries";

const AddClientModal = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name: name, email: email, phone: number },
        update(cache, { data: { addClient } }) {
            const { clients } = cache.readQuery({ query: GET_CLIENTS });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {
                    clients: { ...clients, addClient },
                },
            });
        },
    });

    const onSubmit = (e) => {
        e.preventDefault();
        addClient(name, email, number).then(() => {
            setName("");
            setEmail("");
            setNumber("");
        });
    };
    const onChangeName = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };
    const onChangeEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    };
    const onChangeNumber = (e) => {
        e.preventDefault();
        setNumber(e.target.value);
    };

    return (
        <>
            <>
                <button
                    type="button"
                    className="rounded-circle fw-medium text-tertiary shadow"
                    style={{
                        zIndex: 100,
                        position: "absolute",
                        bottom: "0px",
                        right: "0px",
                        height: "60px",
                        width: "60px",
                        backgroundColor: "#5de4ff",
                        border: "2px solid silver",
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#addClientModal">
                    <FaPlus
                        style={{
                            height: "2rem",
                            width: "2rem",
                            marginTop: ".37rem",
                            marginLeft: "0rem",
                            color: "white",
                        }}
                    />
                </button>
                <form>
                    <div
                        className="modal fade"
                        id="addClientModal"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1
                                        className="modal-title fs-5"
                                        id="modalTitle">
                                        Add new Client
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
                                            htmlFor="email"
                                            className="form-label">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={email}
                                            onChange={onChangeEmail}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="number"
                                            className="form-label">
                                            Number
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="number"
                                            value={number}
                                            onChange={onChangeNumber}
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn"
                                        data-bs-dismiss="modal">
                                        Close
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn"
                                        data-bs-dismiss="modal"
                                        onClick={onSubmit}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        </>
    );
};

export default AddClientModal;
