import http from "http"
import express, { Express, Request, Response } from "express";
import { ApolloServer } from 'apollo-server-express';
import {
	ApolloServerPluginDrainHttpServer,
	ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';

import typeDefs from "./graphql/types";
import resolvers from "./graphql/resolvers";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
	res.send("Typescript and Node works")
})

async function startApolloServer(typeDefs: any, resolvers: any) {
	const app = express();
	const httpServer = http.createServer(app);
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		csrfPrevention: true,
		cache: 'bounded',
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			ApolloServerPluginLandingPageLocalDefault({ embed: true }),
		],
	});
	await server.start();
	server.applyMiddleware({
		app,
		path: '/graphql',
		// cors: true,
	});

	await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers)