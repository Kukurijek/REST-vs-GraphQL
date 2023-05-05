const {
  GraphQLClient,
  gql
} = require('graphql-request');
const {
  faker,
  AddressModule
} = require('@faker-js/faker');


const endpoint = 'http://localhost:4000'

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {},
})


async function getUsersFnameLNameReviewsMovieName() {
  const query = gql `
    query GetUsers {
        getUsers {
          firstName
          lastName
          reviews {
            title
            description
            body
            movie {
              name
            }
          }
        }
      }
    `;
  return graphQLClient.request(query);
}

async function addUser() {
  const mutation = gql `
  mutation AddUser($firstName: String!, $lastName: String!, $email: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email) {
      firstName
      lastName
      email
    }
  }
  `;
  const variables = {
    "firstName": faker.name.firstName(),
    "lastName": faker.name.lastName(),
    "email": faker.internet.email()
  }

  return await graphQLClient.request(mutation, variables);
}

async function addMovie() {
  const mutation = gql `
  mutation AddMovie($name: String!, $producer: String!, $rating: Float!) {
    addMovie(name: $name, producer: $producer, rating: $rating) {
      name
      producer
      rating
    }
  }
  `
  const variables = {
    "name": faker.lorem.words(3),
    "producer": faker.name.fullName(),
    "rating": Math.floor(Math.random() * 6)
  }

  return await graphQLClient.request(mutation, variables);
}

async function addReview(userId, movieId) {
  console.log(userId)
  const mutation = gql `
  mutation AddReview($title: String!, $description: String!, $body: String!, $userId: ID!, $movieId: ID!) {
    addReview(title: $title, description: $description, body: $body, userID: $userId, movieID: $movieId) {
      title
    }
  }
  `
  const variables = {
    "title": faker.color.human(),
    "description": faker.lorem.paragraphs(1),
    "body": faker.lorem.paragraphs(5),
    "userId": userId.toString(),
    "movieId": movieId.toString()
  }
  return await graphQLClient.request(mutation, variables);
}


addUser().catch((error) => console.error(error))

exports.getUsersFnameLNameReviewsMovieName = getUsersFnameLNameReviewsMovieName;
exports.addUser = addUser;
exports.addMovie = addMovie;
exports.addReview = addReview;