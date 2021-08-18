const Follow = require('../models/follow');
const User = require('../models/User');

const follow = async (username, ctx) => {
   const userFound = await User.findOne({ username });
   if (!userFound) throw new Error('User not found');

   try {
      const follow = new Follow({
         idUser: ctx.user.id,
         follow: userFound._id,
      });

      follow.save();
      return true;
   } catch (error) {
      console.log(error);
      return false;
   }
};

const isFollow = async (username, ctx) => {
   const userFound = await User.findOne({ username });
   if (!userFound) throw new Error('User not found');

   const follow = await Follow.findOne({
      idUser: ctx.user.id,
      follow: userFound._id,
   });

   if (follow) return true;
   return false;
};

module.exports = {
   follow,
   isFollow,
};
