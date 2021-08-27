const Comment = require('../models/comment');

const addComment = async (input, ctx) => {
   try {
      const comment = new Comment({
         idPublication: input.idPublication,
         idUser: ctx.user.id,
         comment: input.comment,
      });
      comment.save();
      return comment;
   } catch (error) {
      console.error(error);
      return null;
   }
};

module.exports = {
   addComment,
};
