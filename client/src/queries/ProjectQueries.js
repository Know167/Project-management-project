import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
    {
        projects {
            id
            name
            status
            client{
                name
            }
        }
    }
`;

export { GET_PROJECTS };
