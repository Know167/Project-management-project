import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/ProjectQueries";
import Spinner from "./Spinner";

const ProjectInfo = () => {
    const { id } = useParams();
    console.log(id);
    const { loading, error, data } = useQuery(GET_PROJECT, {
        variables: { id: {id} },
    });
    if (loading) <Spinner />;
    if (error) <p>Something Somewhere Went Sideways</p>;
    // console.log(data);
    // return <>{!loading && !error && data && <div>bro
    // </div>}</>;
};

export default ProjectInfo;
