var express = require('express');
var router = express.Router();
var Book = require('../models/Book');
var Comment = require('../models/Comment')

// GET new form
router.post('/', async (req, res, next) => {
    try {
      const books = await Book.create(req.body);
      res.status(200).json(books);
    } catch (err) {
      return next(err);
    }
});
// GET list of books
router.get('/', async (req, res, next) => {
    try {
      const books = await Book.find({});
      res.status(200).json(books);
    } catch (err) {
      return next(err);
    }
  });
  // GET single book
router.get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const book = await Book.findById(id).lean().exec();
      res.status(200).json(book);
    } catch (err) {
      return next(err);
    }
  });
 // Update details 
router.put('/:id/update', async(req, res, next) => {
    try {
      const id = req.params.id;
      const book = await Book.findByIdAndUpdate(id, req.body, {new: true});
      res.status(200).json(book);
    } catch (err) {
      return next(err);
    }
  })
  // Delete book 
router.delete('/:id/delete', async(req, res, next) => {
    try {
      const id = req.params.id;
      const book = await Book.findByIdAndDelete(id);
      console.log(book);
      const comment = await Comment.deleteMany({book:id});
      res.status(200).json(book);
    } catch (err) {
      return next(err);
    }
  })
  
module.exports = router;