const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLInputObjectType,
} = require("graphql");

const Project = require("../models/Project");
const Client = require("../models/Client");

//Clients
const ClientType = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    }),
});
const currentDate = new Date();
// Timeline Input type
const DateInputType = new GraphQLInputObjectType({
    name: "DateInput",
    fields: () => ({
        year: {
            type: new GraphQLNonNull(GraphQLInt),
            defaultValue: currentDate.getFullYear,
        },
        month: {
            type: new GraphQLNonNull(GraphQLInt),
            defaultValue: currentDate.getMonth,
        },
        date: {
            type: new GraphQLNonNull(GraphQLInt),
            defaultValue: currentDate.getDate,
        },
    }),
});
const TaskInputListType = new GraphQLInputObjectType({
    name: "TaskInputList",
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            defaultValue: (source, args, context, info) => {
                return `${source.project} ${source.name}`;
            },
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        progress: { type: new GraphQLNonNull(GraphQLInt) },
        hideChildren: { type: GraphQLBoolean, defaultValue: true },
        type: { type: GraphQLString, defaultValue: "task" },
        start: { type: new GraphQLNonNull(DateInputType) },
        end: { type: new GraphQLNonNull(DateInputType) },
        dependencies: { type: new GraphQLList(GraphQLString) },
        project: { type: GraphQLString },
        isDisabled: { type: GraphQLBoolean, defaultValue: true },
    }),
});
const TaskInputType = new GraphQLInputObjectType({
    name: "TaskInput",
    fields: () => ({
        tasks: { type: new GraphQLList(TaskInputListType) },
    }),
});

// Timeline Display type
const DateType = new GraphQLObjectType({
    name: "Date",
    fields: () => ({
        year: { type: GraphQLInt },
        month: { type: GraphQLInt },
        date: { type: GraphQLInt },
    }),
});

const TaskListType = new GraphQLObjectType({
    name: "TaskList",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        progress: { type: GraphQLInt },
        hideChildren: { type: GraphQLBoolean },
        type: { type: GraphQLString },
        start: { type: DateType },
        end: { type: DateType },
        dependencies: { type: new GraphQLList(GraphQLString) },
        project: { type: GraphQLString },
        isDisabled: { type: GraphQLBoolean },
    }),
});
const Task = new GraphQLObjectType({
    name: "Task",
    fields: () => ({
        tasks: { type: new GraphQLList(TaskListType) },
    }),
});

const ProjectType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return Client.findById(parent.clientId);
            },
        },
        timeline: {
            type: Task,
        },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.find();
            },
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Client.findById(args.id);
            },
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find();
            },
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Project.findById(args.id);
            },
        },
    },
});

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addClient: {
            type: ClientType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parents, args) {
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });

                return client.save();
            },
        },
        removeClient: {
            type: ClientType,
            args: { id: { type: GraphQLNonNull(GraphQLID) } },
            resolve(parents, args) {
                Project.deleteMany({ clientId: args.id }).then(() =>
                    Client.findByIdAndDelete(args.id)
                );
            },
        },
        addProject: {
            type: ProjectType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                clientId: { type: GraphQLNonNull(GraphQLID) },
                status: { type: GraphQLNonNull(GraphQLString) },
                timeline: {
                    type: TaskInputType,
                },
            },
            resolve(parents, args) {
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId,
                    timeline: args.timeline,
                });

                return project.save();
            },
        },
        removeProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parents, args) {
                return Project.findByIdAndDelete(args.id);
            },
        },
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: { type: GraphQLString },
            },
            resolve(parents, args) {
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status,
                        },
                    },
                    { new: true }
                );
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
});
