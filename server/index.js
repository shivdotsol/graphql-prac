import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import axios from "axios";

const startServer = async () => {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
            type User{
                id: ID!
                name: String!,
                username: String!,
                email: String!,
                phone: String!,
                website: String!
            }

            type Todo{
                id: ID!,
                title: String!,
                completed: Boolean,
                user: User
            }
            
            type Query{
                getTodos:[Todo],
                getAllUsers:[User],
                getUserById(id: ID!): User
                getTodoById(id: ID!): Todo
            }
        `,
        resolvers: {
            Todo: {
                user: async (todo) =>
                    (
                        await axios.get(
                            `https://jsonplaceholder.typicode.com/users/${todo.userId}`
                        )
                    ).data,
            },
            Query: {
                getTodos: async () =>
                    (
                        await axios.get(
                            "https://jsonplaceholder.typicode.com/todos"
                        )
                    ).data,
                getAllUsers: async () =>
                    (
                        await axios.get(
                            "https://jsonplaceholder.typicode.com/users"
                        )
                    ).data,
                getUserById: async (parent, { id }) =>
                    (
                        await axios.get(
                            `https://jsonplaceholder.typicode.com/users/${id}`
                        )
                    ).data,
                getTodoById: async (parent, { id }) =>
                    (
                        await axios.get(
                            `https://jsonplaceholder.typicode.com/todos/${id}`
                        )
                    ).data,
            },
        },
    });

    app.use(express.json());
    app.use(cors());

    await server.start();
    app.use("/graphql", expressMiddleware(server));

    app.listen(3000, () => console.log("server started at port 3000"));
};

startServer();
