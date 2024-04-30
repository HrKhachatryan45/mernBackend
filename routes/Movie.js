const express = require('express')
const router = express.Router()
const {addMovie,removeMovie}= require('../controllers/movieController')

router.post('/:userId/addMovie',addMovie)

router.delete('/:userId/removeMovie/:movieId/model/:modelId',removeMovie)

module.exports = router