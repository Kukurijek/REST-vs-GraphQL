const Movie = require('../../Database/models/movie').Movies;
const User = require('../../Database/models/user').Users;
const Review = require('../../Database/models/review').Reviews
const resolvers = {
    Query: {
        getMovies: async (parent, args) => {
            return Movie.find({}).populate({
                path: 'reviews',
                populate: {
                    path: 'user',
                    model: 'User'
                }
            });
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
            });
        },
        getReviews: async (parent, args) => {
            return await Review.find({}).populate('user').populate('movie');
        },
        getReview: async (parent, args) => {
            return await Review.findById(args.id);
        }
    },
    Mutation: {
        addMovie: (parent, args) => {
            let movie = new Movie({
                name: args.name,
                producer: args.producer,
                rating: args.rating,
            });
            return movie.save();
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
        addUser: (parent, args) => {
            let user = new User({
                firstName: args.firstName,
                lastName: args.lastName,
                email: args.email
            });
            return user.save();
        },
        addReview: (parent, args) => {
            let review = new Review({
                title: args.title,
                description: args.description,
                body: args.body,
                user: args.userID,
                movie: args.movieID

            })
            console.log(review)
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


        }
    }
}

module.exports = {
    resolvers
};