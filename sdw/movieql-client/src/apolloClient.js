import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://movieql-osezlvygsg.now.sh"
});

export default client;
