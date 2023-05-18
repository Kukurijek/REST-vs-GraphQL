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
            }).limit(args.limit);

        },
        getUser: async (parent, args) => {
            return User.findById(args.id).populate({
                path: 'reviews',
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
        updateMovie: async (parent, args) => {
            if (!args.id) return;
            return Movie.findByIdAndUpdate({
                _id: args.id
            }, {
                $set: {
                    name: args.name,
                    producer: args.producer,
                    rating: args.rating,
                }
            }, {
                new: true
            });
        },
        addUser: async (parent, args) => {
            let user = new User({
                firstName: args.firstName,
                lastName: args.lastName,
                email: args.email,
                dateOfBirth: args.dateOfBirth,
                location: args.location,
                favoriteGenre: args.favoriteGenre,
                userDescription: args.userDescription,
                phoneNumber: args.phoneNumber

            });
            return await user.save();
        },
        updateUser: async (parentt, args) => {
            if (!args.id) {
                console.error('CCould not find user, status code 404');
                return;
            }
            return User.findOneAndUpdate({
                _id: args.id
            }, {
                $set: args
            }, {
                new: true
            })
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
                .then(async result => {
                    await User.findById(result.user.toString())
                        .then(result => {
                            result.reviews.push(review);
                            result.save();
                        })
                    await Movie.findById(result.movie.toString())
                        .then(result => {
                            result.reviews.push(review)
                            result.save();
                        })
                    return review
                })


        },
        updateReview: async (parent, args) => {
            if (!args.id) {
                console.error('No such review. status code 404');
                return;
            }
            return Review.findByIdAndUpdate({
                _id: args.id
            }, {
                $set: args
            }, {
                new: true

            });
        },
        //Delete review
        deleteReview: async (parent, args) => {
            if (!args.id) {
                return;
            }
            return Review.findByIdAndDelete({
                _id: args.id
            }).then(async removed_review => {
                if (!removed_review) {
                    return new Error('Review does not exists')
                } else {
                    await Promise.all([
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
                    ])
                    return removed_review
                }
            })


        },
        deleteMovie: async (parent, args) => {
            if (!args.id) {
                return;
            }
            return Movie.findByIdAndDelete({
                _id: args.id
            }).then(async removed_movie => {
                if (!removed_movie) {
                    return new Error('Movie does not exists')
                } else {
                    const review_ids = removed_movie.reviews;
                    await User.updateMany({
                        reviews: {
                            $in: review_ids
                        }
                    }, {
                        $pull: {
                            reviews: {
                                $in: review_ids
                            }
                        }
                    }).then(async () => {
                        await Review.deleteMany({
                            _id: {
                                $in: review_ids
                            }
                        }).catch(error => {
                            connsole.error('Error occured deleting movie reviews: ', error);
                            res.status(500).json({
                                error: 'Internal server error'
                            });
                        })
                        return removed_movie
                    })

                }
            })
        },
        deleteUser: async (parent, args) => {
            if (!args.id) {
                return;
            }
            return User.findByIdAndDelete({
                _id: args.id
            }).then(async removed_user => {
                if (!removed_user) {
                    return new Error('User not found')
                } else {
                    const review_ids = removed_user.reviews;
                    await Movie.updateMany({
                        reviews: {
                            $in: review_ids
                        }
                    }, {
                        $pull: {
                            reviews: {
                                $in: review_ids
                            }
                        }
                    }).then(async () => {
                        await Review.deleteMany({
                            _id: {
                                $in: review_ids
                            }
                        });
                        return removed_user;
                    })

                }
            })
        }
    }
}
module.exports = {
    resolvers
};