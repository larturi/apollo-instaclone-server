const Publication = require('../models/publication');
const Follow = require('../models/follow');
const User = require('../models/user');
const awsUploadImage = require('../utils/aws-upload-image');
const { v4: uuidv4 } = require('uuid');

const publish = async (file, ctx) => {
   const { createReadStream, mimetype } = await file;
   const extension = mimetype.split('/')[1];

   const filename = `publication/${uuidv4()}.${extension}`;
   const fileData = createReadStream();

   console.log(file);

   try {
      const result = await awsUploadImage(fileData, filename);
      const publication = new Publication({
         idUser: ctx.user.id,
         file: result.Location,
         typeFile: mimetype.split('/')[0],
         createAt: Date.now(),
      });
      publication.save();

      return {
         status: true,
         urlFile: result.Location,
      };
   } catch (error) {
      return {
         status: null,
         urlFile: '',
      };
   }

   return null;
};

const getPublications = async (username) => {
   const user = await User.findOne({ username });

   if (!user) throw new Error('User not found');

   const publications = await Publication.find({ idUser: user._id }).sort({
      createAt: -1,
   });

   return publications;
};

const getPublicationFolloweds = async (ctx) => {
   const followeds = await Follow.find({ idUser: ctx.user.id }).populate(
      'follow'
   );

   const followedList = [];
   for await (const data of followeds) {
      followedList.push(data.follow);
   }

   const publicationsList = [];
   for await (const data of followedList) {
      const publications = await Publication.find({ idUser: data._id })
         .sort({
            createAt: -1,
         })
         .populate('idUser')
         .limit(10);
      publicationsList.push(...publications);
   }

   const result = publicationsList.sort((a, b) => {
      return new Date(b.createAt) - new Date(a.createAt);
   });

   return result;
};

module.exports = {
   publish,
   getPublications,
   getPublicationFolloweds,
};
