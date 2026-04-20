import { GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL!;

export const client = new GraphQLClient(endpoint, {
	headers: {
		"Content-Type": "application/json",
	},
});
