const Like = require('../models/like');

const addLike = async (idPublication, ctx) => {
   try {
      const like = new Like({
         idPublication,
         idUser: ctx.user.id,
      });
      like.save();
      return true;
   } catch (error) {
      console.log(error);
      return false;
   }
};
const deleteLike = async (idPublication, ctx) => {
   try {
      await Like.findOneAndDelete({ idPublication }).where({
         idUser: ctx.user.id,
      });
      return true;
   } catch (error) {
      console.log(error);
      return false;
   }
};

module.exports = {
   addLike,
   deleteLike,
};
