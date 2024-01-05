import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Header from "./components/Header";
import Home from "./components/Home";
import Clients from "./components/Clients";
import Projects from "./components/Projects";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import ProjectInfo from "./components/ProjectInfo";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "clients",
        element: <Clients />,
    },
    {
        path: "projects",
        element: <Projects />,
    },
    {
        path: "projects/:id",
        element:<ProjectInfo/>,
    },
    {
        path: '*',
        element:<ErrorPage/>,
    }
]);

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                clients: {
                    merge(existing, incoming) {
                        return incoming;
                    },
                },
                projects: {
                    merge(existing, incoming) {
                        return incoming;
                    },
                },
            },
        },
    },
});

const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache,
});

function App() {
    return (
        <>
            <ApolloProvider client={client}>
                <div className="container">
                    <Header />
                    <RouterProvider router={router} />
                </div>
            </ApolloProvider>
        </>
    );
}

export default App;
