const { ApolloServer, gql } = require("apollo-server");
const typeDefs = `
  type Movie {
    id: ID!
    title: String!
    tagline: String
    revenue: Int
    studio: Studio
  }

  type Studio {
    id: ID!
    name: String!
    location: String!
  }

  type Query {
    allMovies: [Movie!]
  }
`;
const resolvers = {
	Query: {
		allMovies: (root, args, context) => {
			return movies;
		}
	},
	Movie: {
		studio: (root, args, context) => {
			return studios.find(studio => {
				return studio.movieIds.find(movieId => movieId === root.id);
			});
		}
	}
};

const server = new ApolloServer({
	typeDefs,
	resolvers
});

server.listen({ port: 3001 }).then(({ url }) => {
	console.log(`server running on at ${url}`);
});
