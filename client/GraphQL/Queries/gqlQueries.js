const {
  GraphQLClient,
  gql,
  batchRequests
} = require('graphql-request');
const {
  faker,
  AddressModule
} = require('@faker-js/faker');

const fileWrite = require('../../helpers/testWriter');

const endpoint = 'http://localhost:4000/'
const graphQLClient = new GraphQLClient(endpoint, {
  headers: {},
})
var resArray = [];
resArray.push('gql_ram_usage, gql_cpu_usage\n')
var count = 0;

function middleware(response) {
  console.log(JSON.stringify(response));
  /*
  var fileName = `../Testresults/Graph/batchRequest6Queries_gql_iterations_1000.csv`
  count = count + 1;
  if (count > 3) {
    resArray.push(response);
  }


  if (resArray.length > 999) {
    fileWrite.saveGqlPerformance(resArray, fileName);
  } else {

  }

  return {
    ...response,
    headers: {
      ...response.headers
    }

  }
  */
}
async function createMovieAndTwoReviewsBatch(userId, movieID) {
  const query1 = gql `
  mutation AddMovie($name: String!, $producer: String!, $rating: Float!) {
    addMovie(name: $name, producer: $producer, rating: $rating) {
      id
    }
  }
  `
  const query2 = gql `
  mutation AddReview($title: String!, $description: String!, $body: String!, $userId: ID!, $movieId: ID!) {
    addReview(title: $title, description: $description, body: $body, userID: $userId, movieID: $movieId) {
    id  
    }
  }
  `
  const query3 = gql `
  mutation AddReview($title: String!, $description: String!, $body: String!, $userId: ID!, $movieId: ID!) {
    addReview(title: $title, description: $description, body: $body, userID: $userId, movieID: $movieId) {
    id  
    }
  }
  `
  variables1 = {
    "name": faker.color.human(),
    "producer": faker.name.fullName(),
    "rating": Math.floor(Math.random() * 6),
  }
  variables2 = {
    "movieId": movieID,
    "userId": userId,
    "body": faker.lorem.paragraphs(3),
    "description": faker.lorem.paragraphs(1),
    "title": faker.color.human(),
  }
  variables3 = {
    "movieId": movieID,
    "userId": userId,
    "body": faker.lorem.paragraphs(3),
    "description": faker.lorem.paragraphs(1),
    "title": faker.color.human(),
  }
  const batchQuery = [{
      document: query1,
      variables: variables1
    },
    {
      document: query2,
      variables: variables2
    },
    {
      document: query3,
      variables: variables3
    }
  ]
  return await graphQLClient.batchRequests(batchQuery)

}
async function createTwoMoviesTwoUsersTwoReviews(userId, movieId) {
  const query1 = gql `
  mutation AddMovie($name: String!, $producer: String!, $rating: Float!) {
    addMovie(name: $name, producer: $producer, rating: $rating) {
      id
      name
      producer
    }
  }
  `
  const query2 = gql `
  mutation UpdateMovie($updateMovieId: ID!, $name: String!, $producer: String!) {
    updateMovie(id: $updateMovieId, name: $name, producer: $producer) {
    id  
    name
    producer
    }
  }
  `
  const query3 = gql `
  mutation AddReview($title: String!, $description: String!, $body: String!, $userId: ID!, $movieId: ID!) {
    addReview(title: $title, description: $description, body: $body, userID: $userId, movieID: $movieId) {
    id  
    description
    body
    }
  }
  `
  const query4 = gql `
  mutation UpdateUser($updateUserId: ID!, $firstName: String, $lastName: String, $email: String) {
    updateUser(id: $updateUserId, firstName: $firstName, lastName: $lastName, email: $email) {
    id
    firstName

    }
  }
  `
  const query5 = gql `
  mutation AddUser($firstName: String!, $lastName: String!, $email: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email) {
      id
      firstName
      lastName
    }
  }
  `
  const query6 = gql `
  mutation AddUser($firstName: String!, $lastName: String!, $email: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email) {
      id
      firstName
      lastName
    }
  }
  `

  variables1 = {
    "name": faker.color.human(),
    "producer": faker.name.fullName(),
    "rating": Math.floor(Math.random() * 6)
  }
  variables2 = {
    "updateMovieId": movieId,
    "name": faker.color.human(),
    "producer": faker.name.fullName()
  }
  variables3 = {
    "movieId": movieId,
    "userId": userId,
    "body": faker.lorem.paragraphs(3),
    "description": faker.lorem.paragraphs(1),
    "title": faker.color.human(),
  }
  variables4 = {
    "updateUserId": userId,
    "firstName": faker.name.firstName(),
    "lastName": faker.name.lastName(),
    "email": faker.internet.email()
  }
  variables5 = {
    "firstName": faker.name.firstName(),
    "lastName": faker.name.lastName(),
    "email": faker.internet.email()
  }
  variables6 = {
    "firstName": faker.name.firstName(),
    "lastName": faker.name.lastName(),
    "email": faker.internet.email()
  }

  const batchQuery = [{
      document: query1,
      variables: variables1
    },
    {
      document: query2,
      variables: variables2
    },
    {
      document: query3,
      variables: variables3
    }, {
      document: query4,
      variables: variables4
    },
    {
      document: query5,
      variables: variables5
    },
    {
      document: query6,
      variables: variables6
    }
  ]
  return await graphQLClient.batchRequests(batchQuery)
}
async function createMovieAndTwoReviews(userId, movieID) {
  const queryCreateMovie = gql `
  mutation Mutation($name: String!, $producer: String!, $rating: Float!, $title1: String!, $description1: String!, $body1: String!, $userId1: ID!, $movieId1: ID!, 
    $title2: String!, $description2: String!, $body2: String!, $userId2: ID!, $movieId2: ID!) {
    CreateMovie: addMovie(name: $name, producer: $producer, rating: $rating) {
      id
    }
    CreateReview1: addReview(title: $title1, description: $description1, body: $body1, userID: $userId1, movieID: $movieId1) {
      id
    }
    CreateReview2: addReview(title: $title2, description: $description2, body: $body2, userID: $userId2, movieID: $movieId2){
      id
    }
    
  }

    `
  variables = {
    "name": faker.color.human(),
    "producer": faker.name.fullName(),
    "rating": Math.floor(Math.random() * 6),
    "movieId1": movieID,
    "userId1": userId,
    "body1": faker.lorem.paragraphs(3),
    "description1": faker.lorem.paragraphs(1),
    "title1": faker.color.human(),
    "movieId2": movieID,
    "userId2": userId,
    "body2": faker.lorem.paragraphs(3),
    "description2": faker.lorem.paragraphs(1),
    "title2": faker.color.human(),

  }

  return await graphQLClient.rawRequest(queryCreateMovie, variables)

}
async function getUserLimitedFields(userID) {
  const query = gql `
  query GetUser($getUserId: ID!) {
    getUser(id: $getUserId) {
      id
      firstName
      lastName
      email
    }
  }
  `
  variables = {
    "getUserId": userID
  }
  return await graphQLClient.rawRequest(query, variables);
}
async function getUserAllFields(userID) {
  const query = gql `
  query GetUser($getUserId: ID!) {
    getUser(id: $getUserId) {
      id
      firstName
      lastName
      phoneNumber
      location
      email
      favoriteGenre
      dateOfBirth
      userDescription
      reviews {
        title
        body
        description
        id
      }
    }
  }
  `

  variables = {
    "getUserId": userID
  }
  return await graphQLClient.rawRequest(query, variables);
}

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
/*async function CreateUserFiveBatching(){

}*/

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
async function addUserBigData() {
  const mutation = gql `
    mutation AddUser($firstName: String!, $lastName: String!, $email: String!, $dateOfBirth: String, $location: String, $favoriteGenre: String, $userDescription: String, $phoneNumber: Int) {
      addUser(firstName: $firstName, lastName: $lastName, email: $email, dateOfBirth: $dateOfBirth, location: $location, favoriteGenre: $favoriteGenre, userDescription: $userDescription, phoneNumber: $phoneNumber) {
        id
      }
    }
    `
  const variables = {
    "firstName": faker.lorem.paragraphs(10),
    "lastName": faker.lorem.paragraphs(10),
    "email": faker.lorem.paragraphs(10),
    "dateOfBirth": Math.floor(Math.random() * (10000 - 1 + 1) + 1).toString(),
    "location": faker.lorem.paragraphs(10),
    "favoriteGenre": faker.lorem.paragraphs(10),
    "userDescription": faker.lorem.paragraphs(30),
    "phoneNumber": Math.floor(Math.random() * (20000 - 1 + 1) + 1)
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
async function updateMovie(movieId) {
  const mutation = gql `
    mutation Mutation($updateMovieId: ID!, $name: String!, $producer: String!) {
      updateMovie(id: $updateMovieId, name: $name, producer: $producer) {
        id
      }
    }
    `
  const variables = {
    "updateMovieId": movieId,
    "name": faker.color.human(),
    "producer": faker.name.fullName()
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
exports.updateMovie = updateMovie;
exports.addUserBigData = addUserBigData;
exports.createMovieAndTwoReviews = createMovieAndTwoReviews;
exports.createMovieAndTwoReviewsBatch = createMovieAndTwoReviewsBatch;
exports.createTwoMoviesTwoUsersTwoReviews = createTwoMoviesTwoUsersTwoReviews;
exports.getUserAllFields = getUserAllFields;
exports.getUserLimitedFields = getUserLimitedFields;
