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

const unFollow = async (username, ctx) => {
   const userFound = await User.findOne({ username });
   if (!userFound) throw new Error('User not found');

   try {
      const follow = await Follow.findOneAndDelete({
         idUser: ctx.user.id,
         follow: userFound._id,
      });

      if (follow) return true;

      return false;
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

const getFollowers = async (username) => {
   const user = await User.findOne({ username });
   const followers = await Follow.find({
      follow: user._id,
   }).populate('idUser');

   const followersList = [];

   for await (const follower of followers) {
      followersList.push(follower.idUser);
   }

   return followersList;
};

module.exports = {
   follow,
   unFollow,
   isFollow,
   getFollowers,
};
