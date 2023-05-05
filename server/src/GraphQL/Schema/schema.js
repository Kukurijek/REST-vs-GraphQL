const {
  gql
} = require('apollo-server-express');


const typeDefs = gql ` 
   type Movie { 
     id: ID! 
     name: String! 
     producer: String! 
     rating: Float
     reviews: [Review]
 }
 type Review{
    id: ID!
    title: String
    description: String
    body: String
    movie: Movie
    user: User
 }
 type User{
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    reviews: [Review]
  
 } 
 type Query { 
   getMovies: [Movie] 
   getMovie(id: ID!): Movie 
   getUsers: [User]
   getUser(id: ID!): User
   getReviews: [Review]
   getReview(id: ID!): Review
 } 
 type Mutation {
     addUser(firstName: String!, lastName: String!, email: String!) : User
     addReview(title: String!, description: String!, body: String!, userID: ID!, movieID: ID!) : Review
     addMovie(name: String!, producer: String!, rating: Float!): Movie 
     updateReview(id: ID!, title: String!, description: String, body: String!) : Review
     updateUser(id: ID!, firstName: String, lastName: String, email: String) : User
     updateMovie(id: ID!, name: String!, producer: String!, rating: Float): Movie 
     deleteMovie(id: ID!): Movie 
   } 
`
module.exports = {
  typeDefs
};