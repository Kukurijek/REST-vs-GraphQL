'use strict';
var counter = 0;
const express = require('express');
const api = express.Router();
const Movie = require('../../Database/models/movie').Movies;
const User = require('../../Database/models/user').Users;
const Review = require('../../Database/models/review').Reviews;

// GET START //
// Fetch one user by id
api.get('/users/:id', (req, res) => {
    User.findById(req.params.id).populate('reviews').exec().then(user => {
        if (!user) {
            res.status(404).json({
                error: 'User not found'
            });
        } else {
            res.json(user);
        }
    }).catch(error => {
        console.error('Error fetching user: ', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    })
})

// Fetch all users in db
api.get('/users', (req, res) => {
    User.find({}).populate('reviews').limit(req.query.limit).then(users => {
        res.json(users);
    })
})

// Fetch one movie by id
api.get('/movies/:id', (req, res) => {
    Movie.findById(req.params.id).populate('reviews').exec().then(movie => {
        if (!movie) {
            res.status(404).json({
                error: 'Movie not found'
            });
        } else {
            res.json(movie);
        }
    }).catch(error => {
        console.error('Error fetching user: ', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    })
})

// Fetch all movie in db
api.get('/movies', (req, res) => {
    Movie.find().then(movies => {
        res.json(movies);
    }).catch(error => {
        console.log('Error:', error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    })
})

// Fetch a review by id
api.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id).populate('movie').populate('user').exec().then(review => {
        if (!review) {
            res.status(404).json({
                error: 'Review not found'
            });
        } else {
            res.json(review);
        }
    }).catch(error => {
        console.error('Error fetching revires: ', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    })
})

// Fetch all reviews
api.get('/reviwes', (req, res) => {
    Review.find().then(reviews => {
        res.json(reviews);
    })
})
// GET END //

// POST START //
// Create a new user from user input
api.post('/users', (req, res) => {
    let new_user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        location: req.body.location,
        favoriteGenre: req.body.favoriteGenre,
        userDescription: req.body.userDescription,
        phoneNumber: req.body.phoneNumber,


    })
    new_user.save().then(saver_user => {
        res.json(saver_user);
    }).catch(error => {
        console.error('Error creating a new user: ', error);
        res.status(500).json({
            error: 'Innternal server error'
        });
    })
})

// Addinng a new movie to the database
api.post('/movies', (req, res) => {
    let new_movie = new Movie({
        name: req.body.name,
        rating: req.body.rating,
        producer: req.body.producer,
    })
    new_movie.save().then(saved_movie => {
        res.json(saved_movie);
    }).catch(error => {
        console.error('Error adding a new movie to the database: ', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    })
})

// Adding review on movie
api.post('/reviews', (req, res) => {
    let new_review = new Review({
        title: req.body.title,
        description: req.body.description,
        body: req.body.body,
        movie: req.body.movieID,
        user: req.body.userID
    })
    new_review.save().then(async saved_review => {
        await User.findById(saved_review.user.toString()).then(user => {
            if (!user) {
                res.status(404).json({
                    error: 'No such user exists'
                });
            } else {
                user.reviews.push(saved_review);
                user.save();
            }
        }).catch(error => {
            console.error('Error fetching user: ', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        })

        await Movie.findById(saved_review.movie.toString()).then(movie => {
            if (!movie) {
                res.status(404).json({
                    error: 'No such movie exists yet in the database'
                });
            } else {
                movie.reviews.push(saved_review);
                movie.save();
                // return postman
            }
        })
        res.json(saved_review);
    }).catch(error => {
        console.error('Error adding the review: ', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    })
})
// POSTT END //

// UPDATE START //
// Update user
api.put('/users', (req, res) => {
    const {
        firstName,
        lastName,
        email,
        dateOfBirth,
        location,
        favoriteGenre,
        userDescription,
        phoneNumber
    } = req.body;
    User.findByIdAndUpdate(req.query.id, {
        firstName,
        lastName,
        email,
        dateOfBirth,
        location,
        favoriteGenre,
        userDescription,
        phoneNumber
    }, {
        new: true
    }).then(updateed_user => {
        if (!updateed_user) {
            res.status(404).json({
                error: 'User not found'
            });
        } else {
            res.json(updateed_user)
        }
    }).catch(error => {
        console.error('Error occurred whilst trying to update the user: ', error);
        res.render(500).json({
            error: 'Internal server error'
        });
    })
})


// Updatte movie
api.put('/movies', (req, res) => {
    const {
        name,
        rating,
        producer
    } = req.body;
    Movie.findByIdAndUpdate({
        _id: req.query.id
    }, {
        name,
        rating,
        producer
    }, {
        new: true
    }).then(updated_movie => {
        if (!updated_movie) {
            res.status(404).json({
                error: 'movie not found'
            });
        } else {
            res.json(updated_movie);
        }
    }).catch(error => {
        console.error('Error ocurred whilst trying to update the movie: ', error);
        res.render(500).json({
            error: 'Internal server error'
        });
    })
})

// Update review
api.put('/reviews', (req, res) => {
    const {
        title,
        description,
        body
    } = req.body;
    Review.findByIdAndUpdate({
        _id: req.query.id
    }, {
        $set: req.body
    }, {
        new: true
    }).then(updated_review => {
        if (!updated_review) {
            res.status(404).json({
                error: 'Review not found'
            });
        } else {
            res.json(updated_review);
        }
    }).catch(error => {
        console.error('Error occurred whilst trying to update review: ', error);
        res.status(500).json({
            error: 'Iternal server error'
        });
    })
})
// UPDATE END //

module.exports = api;