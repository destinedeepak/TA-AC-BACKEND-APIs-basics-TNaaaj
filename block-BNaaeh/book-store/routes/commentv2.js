var express = require('express');
var router = express.Router();
var Book = require('../models/Book');
var Comment = require('../models/Comment');

/* POST remarks */
router.post('/:id/new', async (req, res, next) => {
  console.log('Hi');
  try {
    const bookId = req.params.id;
    req.body.book = bookId;
    const comment = await Comment.create(req.body);
    const book = await Book.findByIdAndUpdate(bookId, {
      $push: { comment: comment._id },
    });
    res.status(200).send(comment);
  } catch (err) {
    return next(err);
  }
});
//   GET comments for specific book
router.get('/:id', async (req, res, next) => {
  try {
      const bookId = req.params.id;
      const comments = await Comment.find({book:bookId});
      res.status(200).json(comments);
  } catch (error) {
    return next(error);
  }
});
// update comments
router.put('/:id/update', async (req, res, next) => {
    try{
      const id = req.params.id;
      console.log("Hi");
      const comment = await Comment.findByIdAndUpdate(id, req.body, {new:true});
      res.status(200).json(comment);
    }catch (err) {
      return next(err);
    }
  })
  // Delete comment
router.delete('/:id/delete', async(req, res, next) => {
    try {
      const id = req.params.id;
      const comment = await Comment.findByIdAndDelete(id);
      let book = await Book.findByIdAndUpdate(comment.book, {$pull:{"comment":id}})
      res.status(200).json(comment);
    } catch (err) {
      return next(err);
    }
  })

module.exports = router;
