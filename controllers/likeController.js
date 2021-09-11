const Like = require('../models/Like');

const addLike = async (idPublication, ctx) => {
   try {
      const like = new Like({
         idPublication,
         idUser: ctx.user.id,
      });
      like.save();
      return true;
   } catch (error) {
      console.error(error);
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
      console.error(error);
      return false;
   }
};

const isLike = async (idPublication, ctx) => {
   try {
      const result = await Like.findOne({ idPublication }).where({
         idUser: ctx.user.id,
      });
      if (!result) throw new Error('No ha dado like');
      return true;
   } catch (error) {
      console.error(error);
      return false;
   }
};

const countLikes = async (idPublication) => {
   try {
      const result = await Like.countDocuments({ idPublication });
      return result;
   } catch (error) {
      console.error(error);
      return false;
   }
};

module.exports = {
   addLike,
   deleteLike,
   isLike,
   countLikes,
};
