import { useMutation } from "@apollo/client";

import { FaTrashAlt } from "react-icons/fa";
import { REMOVE_CLIENT } from "../queries/mutations/ClientMutations";
import { GET_CLIENTS } from "../queries/ClientQueries";
import { GET_PROJECTS } from "../queries/ProjectQueries";

const ClientRow = ({ rowData }) => {
    const [removeClient] = useMutation(REMOVE_CLIENT, {
        variables: { id: rowData.id },
        refetchQueries: [{query: GET_PROJECTS },{query: GET_CLIENTS}],
        /*
        removing this since I also need to update the projects after client deletion which would 
        make this component even more heavier
        */

        // update(cache, { data: { removeClient } }) {
        //     const { clients } = cache.readQuery({ query: GET_CLIENTS });
        //     cache.writeQuery({
        //         query: GET_CLIENTS,
        //         data: {
        //             clients: clients.filter(
        //                 (client) => client.id !== removeClient.id
        //             ),
        //         },
        //     });
        // },
    });
    return (
        <tr>
            <td>{rowData.name}</td>
            <td>{rowData.email}</td>
            <td>{rowData.phone}</td>
            <td className="text-center align-middle">
                <button className="btn btn-sm" onClick={removeClient}>
                    <FaTrashAlt color="#FF674D" />
                </button>
            </td>
        </tr>
    );
};

export default ClientRow;
