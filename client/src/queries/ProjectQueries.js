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
            # timeline{
            #     id
            #     name
            #     progress
            #     hideChildren
            #     type
            #     start
            #     end
            # }
        }
    }
`;

export { GET_PROJECTS, GET_PROJECT };
