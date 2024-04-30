const User=require('../models/userModel');
const Movie=require('../models/movieModel');


//adding Movies
const addMovie = async (req, res) => {
    const { userId } = req.params;
    const {movieItem} = req.body;
    try {
        // Create a new movie
        const movie = new Movie({movieItem,userId})

        // Save the movie
        await movie.save();


        // Automatically add the movie to the user's movies array
        const user = await User.findById(userId);

        res.status(200).json({ message: 'Movie added successfully', movie });
        user.movies.push(movie);
        await user.save();


    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}
const removeMovie = async (req, res) => {
    const { userId, movieId, modelId } = req.params;
    try {
        // Find and delete the movie document
        const movie = await Movie.findByIdAndDelete(modelId);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const user = await User.findById(userId);
        user.movies = user.movies.filter(userMovie => userMovie.movieItem.id !== Number(movieId));
        await user.save();

        res.status(200).json({ message:{e:'Movie successfully deleted'}, movie });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



module.exports= {addMovie,removeMovie}
