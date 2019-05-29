import React from "react";
import client from "./apolloClient";
import { ApolloProvider } from "react-apollo";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app" />
    </ApolloProvider>
  );
}

export default App;
