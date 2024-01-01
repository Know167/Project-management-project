import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
    {
        projects {
            id
            name
            status
            clientId
        }
    }
`;

export { GET_PROJECTS };
