const {
  GraphQLClient,
  gql,
  batchRequests
} = require('graphql-request');
const {
  faker,
  AddressModule
} = require('@faker-js/faker');


const endpoint = 'http://localhost:4000/'

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {},
})


async function getUsersFnameLNameReviewsMovieName() {
  const query = gql `
    query GetUsers {
        getUsers {
          id
          firstName
          lastName
          reviews {
            id
            
          }
        }
      }
    `;
  return graphQLClient.rawRequest(query);
}
async function updateUserFnameLnameEmail(id) {
  const query = gql `
  mutation UpdateUser($updateUserId: ID!, $firstName: String, $lastName: String, $email: String) {
    updateUser(id: $updateUserId, firstName: $firstName, lastName: $lastName, email: $email) {
      id
    }
  }
  `
  variables = {
    "updateUserId": id,
    "firstName": faker.name.firstName(),
    "lastName": faker.name.lastName(),
    "email": faker.internet.email()
  }
  return graphQLClient.rawRequest(query, variables);
}
async function updateUserAllFields(id) {
  const query = gql `
  mutation UpdateUser($updateUserId: ID!, $firstName: String, $lastName: String, $email: String, $dateOfBirth: String, $location: String, $favoriteGenre: String, $userDescription: String, $phoneNumber: Int) {
    updateUser(id: $updateUserId, firstName: $firstName, lastName: $lastName, email: $email, dateOfBirth: $dateOfBirth, location: $location, favoriteGenre: $favoriteGenre, userDescription: $userDescription, phoneNumber: $phoneNumber) {
      id
    }
  }
  `
  variables = {
    "updateUserId": id,
    "firstName": faker.name.firstName(),
    "lastName": faker.name.lastName(),
    "email": faker.internet.email(),
    "dateOfBirth": Math.floor(Math.random() * (10000 - 1 + 1) + 1).toString(),
    "location": faker.address.city(),
    "favoriteGenre": faker.color.human(),
    "userDescription": faker.lorem.paragraphs(),
    "phoneNumber": Math.floor(Math.random() * (20000 - 1 + 1) + 1)
  }
  return graphQLClient.rawRequest(query, variables);
}
async function updateUserLimitedFields(id) {
  const query = gql `
  mutation UpdateUser($updateUserId: ID!, $firstName: String, $lastName: String, $email: String) {
    updateUser(id: $updateUserId, firstName: $firstName, lastName: $lastName, email: $email) {
      id
    }
  }
  `
  variables = {
    "updateUserId": id,
    "firstName": faker.name.firstName(),
    "lastName": faker.name.lastName(),
    "email": faker.internet.email()
  }
  return graphQLClient.rawRequest(query, variables);
}
async function getUserById(id) {
  const query = gql `
  query GetUser($getUserId: ID!) {
    getUser(id: $getUserId) {
      userDescription
      phoneNumber
      location
      lastName
      id
      firstName
      favoriteGenre
      email
      dateOfBirth
      reviews {
        id
      }
    }
  }
  `
  variables = {
    "getUserId": id
  }
  return await graphQLClient.rawRequest(query, variables);
}
async function getMovies() {
  const query = gql `
  query GetMovies {
    getMovies {
      id
      name
      producer
      rating
      reviews {
        id
        title
        description
        body
      }
    }
  }
  `
  return await graphQLClient.rawRequest(query);
}
async function getReviews() {
  const query = gql `
  query GetReviews {
    getReviews {
      id
    }
  }
  `
  return await graphQLClient.rawRequest(query);
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
  return await graphQLClient.rawRequest(mutation, variables);
}
async function addMoreUsers() {

}
async function addUserAllFields() {
  const mutation = gql `
  mutation AddUser($firstName: String!, $lastName: String!, $email: String!, $dateOfBirth: String, $location: String, $favoriteGenre: String, $userDescription: String, $phoneNumber: Int) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, dateOfBirth: $dateOfBirth, location: $location, favoriteGenre: $favoriteGenre, userDescription: $userDescription, phoneNumber: $phoneNumber) {
      id
    }
  }
  `
  const variables = {
    "firstName": faker.name.firstName(),
    "lastName": faker.name.lastName(),
    "email": faker.internet.email(),
    "dateOfBirth": Math.floor(Math.random() * (10000 - 1 + 1) + 1).toString(),
    "location": faker.address.city(),
    "favoriteGenre": faker.color.human(),
    "userDescription": faker.lorem.paragraphs(),
    "phoneNumber": Math.floor(Math.random() * (20000 - 1 + 1) + 1)
  }
  return await graphQLClient.rawRequest(mutation, variables);
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

  return await graphQLClient.rawRequest(mutation, variables);
}

async function addReview(userId, movieId) {
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
    "userId": userId,
    "movieId": movieId
  }
  return await graphQLClient.rawRequest(mutation, variables);
}
async function updateReview(reviewId) {
  const mutation = gql `
  mutation UpdateReview($updateReviewId: ID!, $title: String!, $body: String!) {
    updateReview(id: $updateReviewId, title: $title, body: $body) {
      title
      body
    }
  }
  `
  const variables = {
    "updateReviewId": reviewId,
    "title": faker.color.human(),
    "body": faker.lorem.paragraphs(4)
  }
  return await graphQLClient.rawRequest(mutation, variables);
}


addUser().catch((error) => console.error(error))

exports.getUsersFnameLNameReviewsMovieName = getUsersFnameLNameReviewsMovieName;
exports.addUser = addUser;
exports.addMovie = addMovie;
exports.addReview = addReview;
exports.getUserById = getUserById;
exports.getMovies = getMovies;
exports.getReviews = getReviews;
exports.updateReview = updateReview;
exports.updateUserFnameLnameEmail = updateUserFnameLnameEmail;
exports.updateUserAllFields = updateUserAllFields;
exports.addUserAllFields = addUserAllFields;
exports.updateUserLimitedFields = updateUserLimitedFields;