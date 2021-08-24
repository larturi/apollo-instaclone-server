const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const awsUploadImage = require('../utils/aws-upload-image');

const createToken = (user, SECRET_KEY, expiresIn) => {
   const { id, name, email, username } = user;
   const payload = {
      id,
      name,
      email,
      username,
   };

   return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

const register = async (input) => {
   const newUser = input;
   newUser.email = newUser.email.toLowerCase();
   newUser.username = newUser.username.toLowerCase();

   const { email, username, password } = newUser;

   // Check si el email esta en uso
   const checkEmails = await User.findOne({ email });
   if (checkEmails) throw new Error('El email ya esta en uso');

   // Check si el username esta en uso
   const checkUsername = await User.findOne({ username });
   if (checkUsername) throw new Error('El username ya esta en uso');

   // Encriptar la contraseña
   const salt = await bcrypt.genSaltSync(10);
   newUser.password = await bcrypt.hash(password, salt);

   try {
      const user = new User(newUser);
      user.save();
      return user;
   } catch (error) {
      console.error(error);
      return null;
   }
};

const login = async (input) => {
   const { email, password } = input;
   const userFound = await User.findOne({ email: email.toLowerCase() });

   if (!userFound) throw new Error('Email o password incorrecto');

   const passwordSucces = await bcrypt.compare(password, userFound.password);
   if (!passwordSucces) throw new Error('Email o password incorrecto');

   return {
      token: createToken(userFound, process.env.SECRET_KEY, '24h'),
   };
};

const getUser = async (id, username) => {
   let user = null;

   if (id) user = await User.findById(id);
   if (username) user = await User.findOne({ username });

   if (!user) throw new Error('Usuario no encontrado');

   return user;
};

const updateAvatar = async (file, ctx) => {
   const { id } = ctx.user;
   const { createReadStream, mimetype } = await file;
   const extension = mimetype.split('/')[1];
   const imageName = `avatar/${id}.${extension}`;
   const fileData = createReadStream();

   try {
      const result = await awsUploadImage(fileData, imageName);
      await User.findByIdAndUpdate(id, { avatar: result.Location });
      return {
         status: true,
         urlAvatar: result.Location,
      };
   } catch (error) {
      return {
         status: false,
         urlAvatar: null,
      };
   }
};

const deleteAvatar = async (ctx) => {
   const { id } = ctx.user;

   try {
      await User.findByIdAndUpdate(id, { avatar: '' });
      return true;
   } catch (error) {
      return false;
   }
};

const updateUser = async (input, ctx) => {
   const { id } = ctx.user;

   try {
      if (input.currentPassword && input.newPassword) {
         // Cambiar contraseña
         const userFound = await User.findById(id);
         const passwordSucces = await bcrypt.compare(
            input.currentPassword,
            userFound.password
         );
         if (!passwordSucces) throw new Error('Contraseña incorrecta');
         const salt = await bcrypt.genSaltSync(10);
         const newPasswordCrypt = await bcrypt.hash(input.newPassword, salt);
         await User.findByIdAndUpdate(id, { password: newPasswordCrypt });
      } else {
         // Actualizar datos
         await User.findByIdAndUpdate(id, input);
      }
      return true;
   } catch (error) {
      return false;
   }
};

const search = async (query) => {
   const users = await User.find({
      $or: [
         { username: { $regex: query, $options: 'i' } },
         { name: { $regex: query, $options: 'i' } },
         { email: { $regex: query, $options: 'i' } },
      ],
   });

   return users;
};

module.exports = {
   register,
   login,
   getUser,
   updateAvatar,
   deleteAvatar,
   updateUser,
   search,
};
