const Movie = require('../../Database/models/movie').Movies;
const resolvers = {
    Query: {
        getMovies: async (parent, args) => {
            return await Movie.find({});
        },

        getMovie: async (parent, args) => {
            return await Movie.findById(args.id);
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
        }
    }
}

module.exports = {
    resolvers
};