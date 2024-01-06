import { gql } from "@apollo/client";

const REMOVE_PROJECT = gql`
    mutation removeProject($id: ID!) {
        removeProject(id: $id) {
            id
            name
            status
            client
        }
    }
`;

const ADD_PROJECT = gql`
    mutation addProject($name: String!, $status: String!, $client: ID!) {
        addProject(name: $name, status: $status, client: $client) {
            id
            name
            status
            client
        }
    }
`;

const UPDATE_PROJECT = gql`
    mutation updateProject(
        $id: ID!
        $name: String!
        $status: String!
        $description: String!
    ) {
        updateProject(id:$id, name: $name, status: $status, description: $description) {
            id
            name
            status
            description
        }
    }
`;

export { REMOVE_PROJECT, ADD_PROJECT, UPDATE_PROJECT };
