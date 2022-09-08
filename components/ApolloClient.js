import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { split, HttpLink, ApolloLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createClient } from "graphql-ws";
import { onError } from "@apollo/client/link/error";

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: "ws://127.0.0.1:6060/api/v1/query",
        })
      )
    : null;

const httpLink = new HttpLink({
  uri: "http://127.0.0.1:6060/api/v1/query",
  credentials: "include",
});

const splitLink =
  typeof window !== "undefined" && wsLink != null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
