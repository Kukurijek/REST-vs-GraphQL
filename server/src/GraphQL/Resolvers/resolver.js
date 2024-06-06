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
        }
    }
}
module.exports = {
    resolvers
};
