const Comment = require('../models/Comment');

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

const getComments = async (idPublication) => {
   try {
      const result = await Comment.find({ idPublication }).populate('idUser');
      return result;
   } catch (error) {
      console.error(error);
      return null;
   }
};

module.exports = {
   addComment,
   getComments,
};
