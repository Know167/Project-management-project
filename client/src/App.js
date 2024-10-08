import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Analytics } from "@vercel/analytics/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import Projects from "./pages/Projects";
import ErrorPage from "./pages/ErrorPage";
import ProjectInfo from "./pages/ProjectInfo";
import GanttChart from "./components/GanttChart";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Header />,
        children: [
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
                element: <ProjectInfo />,
            },
            {
                path: "projects/:id/timeline",
                element: <GanttChart />,
            },
            {
                path: "*",
                element: <ErrorPage />,
            },
        ],
    },
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
    uri: "https://verity-manage-backend.vercel.app/graphql",
    cache,
});

function App() {
    return (
        <div style={{ backgroundImage: "url('background.jpg')", backgroundPosition:"cover", height:'100vh' }}>
            <Analytics />
            <ApolloProvider client={client}>
                <RouterProvider router={router} />
            </ApolloProvider>
        </div>
    );
}

export default App;
