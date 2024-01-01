import { gql } from "@apollo/client";

const GET_CLIENTS = gql`
    {
        clients {
            name
            id
            phone
            email
        }
    }
`;

export {GET_CLIENTS};
