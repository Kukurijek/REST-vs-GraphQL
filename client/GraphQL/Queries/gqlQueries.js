const {
    request,
    gql
} = require('graphql-request');

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
    `
    return request('http://localhost:4000/', query);
}


exports.getUsersFnameLNameReviewsMovieName = getUsersFnameLNameReviewsMovieName;