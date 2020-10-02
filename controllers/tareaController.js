const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult }  = require('express-validator');


exports.crearTarea = async (req, res) =>{

     //revisar si hay errores 
     const errores = validationResult(req);

     if(!errores.isEmpty()){
          return res.status(400).json({errores: errores.array() });
     }

     const { proyecto } = req.body;

     try {



          const proy = await Proyecto.findById(proyecto);

          //si el proyecto existe
          if(!proy){
               return res.status(404).json({msg: 'proyecto no encontrado'})
          }

          //verificar si esta autorizado el usuario

            
          if(proy.creador.toString()!==req.usuario.id){
               return res.status(401).json({msg: 'Usuario no autorizado'})
          }
          //Crear una nueva tarea

          const tarea = new Tarea(req.body);
        
          tarea.save();

          res.json(tarea);
     } catch (error) {
          console.log(error);
          res.status(500).send('hubo un error')
     }
}

 exports.listarTareasProyecto = async (req, res) =>{

    //revisar si hay errores 
    const errores = validationResult(req);

    if(!errores.isEmpty()){
         return res.status(400).json({errores: errores.array() });
    }


     try {
          const { proyecto } = req.query;

           
          const proy = await Proyecto.findById(proyecto);

          //si el proyecto existe
          if(!proy){
               return res.status(404).json({msg: 'proyecto no encontrado'})
          }

          //verificar si esta autorizado el usuario

            
          if(proy.creador.toString()!==req.usuario.id){
               return res.status(401).json({msg: 'Usuario no autorizado'})
          }
          //listar una nueva tarea


          const tareas = await Tarea.find({proyecto}).sort({creado: -1})
          res.json(tareas);
     } catch (error) {
          console.log(error);
          res.status(500).send('hubo un error')
     }
}

 //actualizar proyecto

exports.actualizarTarea = async (req, res) =>{



     try {
          const { proyecto, nombre, estado } = req.body;



          //si la tarea existe
          let tareaExiste = await Tarea.findById(req.params.id);

          if(!tareaExiste){
               return res.status(404).json({msg: 'La tarea no existe'})
          }
           
          const proy = await Proyecto.findById(proyecto);

          //verificar si esta autorizado el usuario

            
          if(proy.creador.toString()!==req.usuario.id){
               return res.status(401).json({msg: 'Usuario no autorizado'})
          }
          //actualizar una nueva tarea
          const nuevaTarea= {}

          if(nombre){
               nuevaTarea.nombre=nombre
          }
          if(estado){
               nuevaTarea.estado=estado
          }

          //guardar la tarea

          tareaExiste = await Tarea.findOneAndUpdate({_id : req.params.id}, nuevaTarea, {new: true});

          res.json({tareaExiste});

     } catch (error) {
          console.log(error);
          res.status(500).send('hubo un error')
     }
}

//Elimina una tareqa


exports.eliminarTarea = async (req, res) =>{



     try {
          const { proyecto } = req.body;



          //si la tarea existe
          let tareaExiste = await Tarea.findById(req.params.id);

          if(!tareaExiste){
               return res.status(404).json({msg: 'La tarea no existe'})
          }
           
          const proy = await Proyecto.findById(proyecto);

          //verificar si esta autorizado el usuario

            
          if(proy.creador.toString()!==req.usuario.id){
               return res.status(401).json({msg: 'Usuario no autorizado'})
          }


          //eliminar tarea
          await Tarea.findOneAndRemove({_id: req.params.id});

          res.json({msg: 'Tarea Eliminada'})
          
     } catch (error) {
          console.log(error);
          res.status(500).send('hubo un error')
     }
}
