import { useQuery } from "@apollo/client";

import {GET_CLIENTS} from "../queries/ClientQueries";
import ClientRow from "../components/ClientRow";
import Spinner from "../components/Spinner";
import AddClientModal from "../components/AddClientModal";

const Clients = () => {
    const { loading, error, data } = useQuery(GET_CLIENTS);

    if (loading) return <Spinner />;
    if (error) return <p>{JSON.stringify(error)}</p>;

    return (
        <>
            <AddClientModal/>
            {!loading && !error && (
                <table className="table table-hover mt-3 shadow">
                    <caption>list of clients</caption>
                    <thead className="table-head">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {data.clients.map((rowData) => (
                            <ClientRow key={rowData.id} rowData={rowData} />
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default Clients;
