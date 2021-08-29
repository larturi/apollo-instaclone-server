const Follow = require('../models/follow');
const User = require('../models/user');

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
      console.error(error);
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
      console.error(error);
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

const getFolloweds = async (username) => {
   const user = await User.findOne({ username });
   const followeds = await Follow.find({
      idUser: user._id,
   }).populate('follow');

   const followedsList = [];

   for await (const followed of followeds) {
      followedsList.push(followed.follow);
   }

   return followedsList;
};

const getNotFolloweds = async (ctx) => {
   const users = await User.find().limit(50);

   const arrayUsers = [];

   for await (const user of users) {
      const isFind = await Follow.findOne({
         idUser: ctx.user.id,
         follow: user._id,
      });
      console.log(isFind);
      if (!isFind) {
         if (user._id.toString() !== ctx.user.id.toString()) {
            arrayUsers.push(user);
         }
      }
   }
   return arrayUsers;
};

module.exports = {
   follow,
   unFollow,
   isFollow,
   getFollowers,
   getFolloweds,
   getNotFolloweds,
};
