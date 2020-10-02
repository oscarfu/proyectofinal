const Usuario = require('../models/Usuario');
const  bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');

exports.crearUsuario = async(req, res) => {


     const errores = validationResult(req);

     if(!errores.isEmpty()){
          return res.status(400).json({errores: errores.array() });
     }
     //extraer email y pass
     const {email, password} = req.body;

     
     try {
          let usuario = await Usuario.findOne({email});

          if(usuario){
               return res.status(400).json({msg: 'El correo ya existe'})
          }

          //guardar el usuario
          usuario = new Usuario(req.body);
          //hashear el pass

          const salt = await bcryptjs.genSalt(10);

          usuario.password = await bcryptjs.hash(password, salt);
          await usuario.save();

          //crear y firmar json webtoken
          const payload = {
               usuario: {
                    id: usuario.id
               }
          }

          jwt.sign(payload, process.env.SECRETA, 
               {
                    expiresIn: 3600}, 
               (error, token) =>
               {
                    if(error) throw error;

                    res.json({token});
               }
          )


     } catch (error) {
          console.log(error);
          res.status(400).send('hubo un error');
     }

}