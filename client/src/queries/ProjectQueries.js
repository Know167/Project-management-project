import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
    {
        projects {
            id
            name
            status
            client {
                name
            }
        }
    }
`;
const GET_PROJECT = gql`
    query getProject($id: ID!) {
        project(id: $id) {
            id
            name
            status
            description
            client {
                id
                name
                phone
                email
            }
        }
    }
`;

const GET_TIMELINE = gql`
    query getProject($id: ID!) {
        project(id: $id) {
            id
            name
            timeline {
                tasks {
                    id
                    name
                    progress
                    hideChildren
                    type
                    start {
                        year
                        month
                        date
                    }
                    end {
                        year
                        month
                        date
                    }
                }
            }
        }
    }
`;

export { GET_PROJECTS, GET_PROJECT, GET_TIMELINE };
