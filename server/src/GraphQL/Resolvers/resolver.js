const Movie = require('../../Database/models/movie').Movies;
const User = require('../../Database/models/user').Users;
const Review = require('../../Database/models/review').Reviews
const resolvers = {
    Query: {
        getMovies: async (parent, args) => {
            return Movie.find({}).populate('reviews');
        },

        getMovie: async (parent, args) => {
            return Movie.findById(args.id).populate({
                path: 'reviews',
                populate: {
                    path: 'user',
                    model: 'User'
                }
            });
        },
        getUsers: async (parent, args) => {
            return User.find({}).populate({
                path: 'reviews',
                populate: {
                    path: 'movie',
                    model: 'Movie'
                }
            });

        },
        getUser: async (parent, args) => {
            return User.findById(args.id).populate({
                path: 'reviews',
                populate: {
                    path: 'movie',
                    model: 'Movie'
                }
            })
        },
        getReviews: async (parent, args) => {
            return await Review.find({}).populate('user').populate('movie');
        },
        getReview: async (parent, args) => {
            return await Review.findById(args.id);
        }
    },
    Mutation: {
        addMovie: async (parent, args) => {
            let movie = new Movie({
                name: args.name,
                producer: args.producer,
                rating: args.rating,
            });
            return await movie.save();
        },
        updateMovie: (parent, args) => {
            if (!args.id) return;
            return Movie.findOneAndUpdate({
                _id: args.id
            }, {
                $set: {
                    name: args.name,
                    producer: args.producer,
                    rating: args.rating,
                }
            }, {
                new: true
            }, (err, Movie) => {
                if (err) {
                    console.log('Something went wrong when updating the movie');
                }
            });
        },
        addUser: async (parent, args) => {
            let user = new User({
                firstName: args.firstName,
                lastName: args.lastName,
                email: args.email
            });
            return await user.save();
        },
        updateUser: (parentt, args) => {
            if (!args.id) {
                console.error('CCould not find user, status code 404');
                return;
            }
            const {
                firstName,
                lastName,
                email
            } = args.body;
            return User.findOneAndUpdate({
                _id: args.id
            }, {
                $set: {
                    firstName,
                    lastName,
                    email
                }
            }, {
                new: true
            }, (err, User) => {
                if (err) {
                    console.error('Error ocurred whilst trying to update the user:', err)
                }
            });
        },
        addReview: (parent, args) => {
            let review = new Review({
                title: args.title,
                description: args.description,
                body: args.body,
                user: args.userID,
                movie: args.movieID

            })
            return review
                .save()
                .then(result => {
                    let arr = [];
                    arr.push(User.findByIdAndUpdate(result.user.toString()));
                    User.findById(result.user.toString())
                        .then(result => {
                            result.reviews.push(review);
                            result.save();
                        })

                    Movie.findByIdAndUpdate(result.movie.toString())
                        .then(result => {
                            result.reviews.push(review)
                            result.save();
                        })
                    arr.push(Movie.findById(result.movie.toString()));
                    return review
                })


        },
        updateReview: (parent, args) => {
            if (!args.id) {
                console.error('No such review. status code 404');
                return;
            }
            const {
                title,
                description,
                body
            } = args.body;

            Review.findOneAndUpdate({
                _id: args.id
            }, {
                $set: {
                    title,
                    description,
                    body
                }
            }, {
                new: true

            });
        },
        //Delete review
        deleteReview: (parent, args) => {
            if (!args.id) {
                return;
            }
            Review.findByIdAndDelete(args.id).then(removed_review => {
                if (!removed_review) {
                    console.error("")
                } else {
                    Promise.all([
                        User.updateOne({
                            _id: removed_review.user
                        }, {
                            $pull: {
                                reviews: args.id
                            }
                        }),
                        Movie.updateOne({
                            _id: removed_review.movie
                        }, {
                            $pull: {
                                reviews: args.id
                            }
                        })
                    ]).then(() => {
                        return removed_review;
                    }).catch(error => {
                        console.error('Error occured trying to remove references: ', error);
                    })
                }
            })
        }
    }
}
module.exports = {
    resolvers
};