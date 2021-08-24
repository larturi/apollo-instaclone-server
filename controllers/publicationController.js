const Publication = require('../models/publication');
const awsUploadImage = require('../utils/aws-upload-image');
const { v4: uuidv4 } = require('uuid');

const publish = async (file, ctx) => {
   const { createReadStream, mimetype } = await file;
   const extension = mimetype.split('/')[1];

   const filename = `publication/${uuidv4()}.${extension}`;
   const fileData = createReadStream();

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

module.exports = {
   publish,
};
