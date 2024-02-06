import { gql } from "@apollo/client";

const REMOVE_PROJECT = gql`
    mutation removeProject($id: ID!) {
        removeProject(id: $id) {
            id
            name
            status
        }
    }
`;

const ADD_PROJECT = gql`
    mutation addProject(
        $name: String!
        $status: String!
        $clientId: ID!
        $description: String!
        $timeline: TaskInput!
    ) {
        addProject(
            name: $name
            status: $status
            clientId: $clientId
            description: $description
            timeline: $timeline
        ) {
            id
            name
            status
            client {
                id
                name
                phone
                email
            }
            
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
