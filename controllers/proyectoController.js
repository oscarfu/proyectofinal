const Proyecto = require('../models/Proyecto');
const { validationResult }  = require('express-validator');


exports.crearProyecto = async (req, res) =>{

     //revisar si hay errores 
     const errores = validationResult(req);

     if(!errores.isEmpty()){
          return res.status(400).json({errores: errores.array() });
     }

     try {
          //Crear un nuevo proyecto

          const proyecto = new Proyecto(req.body);
          proyecto.creador = req.usuario.id;
          proyecto.save();

          res.json(proyecto);
     } catch (error) {
          console.log(error);
          res.status(500).send('hubo un error')
     }
}

exports.listarProyectosUsuario = async (req, res) =>{

     
     try {
          //Crear un nuevo proyecto

          const proyectos = await Proyecto.find({creador: req.usuario.id}).sort({creado: -1})
          res.json(proyectos);
     } catch (error) {
          console.log(error);
          res.status(500).send('hubo un error')
     }
}

//actualizar proyecto

exports.actualizarProyecto = async (req, res) =>{

     //revisar si hay errores 
     const errores = validationResult(req);

     if(!errores.isEmpty()){
          return res.status(400).json({errores: errores.array() });
     }

     //extraer la informacion del proyecto

     const {nombre} = req.body;
     const nuevoProyecto = {};

     if(nombre)
     {
          nuevoProyecto.nombre=nombre;
     }


     try {
          //revisar el id
          let proyecto = await Proyecto.findById(req.params.id);

          //si el proyecto existe
          if(!proyecto){
               return res.status(404).json({msg: 'proyecto no encontrado'})
          }

          
          //verificar el creador del proyecto
          if(proyecto.creador.toString()!==req.usuario.id){
               return res.status(401).json({msg: 'Usuario no autorizado'})
          }
          //actualizar
          proyecto = await Proyecto.findByIdAndUpdate(
               {_id: req.params.id},{$set: nuevoProyecto}, {new: true});

          res.json({msg: 'Proyecto Creado', proyecto: nombre})

     } catch (error) {
          console.log(error);
          res.status(500).send('hubo un error')
     }
}

//eliminar proyecto

exports.eliminarProyecto = async (req, res) =>{

     try {
               //revisar el id
          let proyecto = await Proyecto.findById(req.params.id);

          //si el proyecto existe
          if(!proyecto){
               return res.status(404).json({msg: 'proyecto no encontrado'})
          }

          
          //verificar el creador del proyecto
          if(proyecto.creador.toString()!==req.usuario.id){
               return res.status(401).json({msg: 'Usuario no autorizado'})
          }

          //eliminar proyecto
          await Proyecto.findByIdAndRemove({_id: req.params.id},)
          res.json({msg: 'Proyecto Eliminado'})
     } catch (error) {
          console.log(error);
          res.status(500).send('hubo un error')
     }

      
}