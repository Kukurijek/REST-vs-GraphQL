const express = require('express');
const app = express();
const port = 4040;

const
    gqlQueries = require('./GraphQL/Queries/gqlQueries');

console.log(gqlQueries.getUsersFnameLNameReviewsMovieName)
gqlQueries.getUsersFnameLNameReviewsMovieName().then((data) => console.log(JSON.stringify(data)));