const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth=require('../middleware/auth');
const {check} = require('express-validator');



//crea proyectos
//api/proyectos
router.post('/', auth,
[
     check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
],
proyectoController.crearProyecto);
//obtener los proyectos 
router.get('/', auth,proyectoController.listarProyectosUsuario);
//actualizar proyectos via id
router.put('/:id', 
auth,
[
     check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
],
proyectoController.actualizarProyecto);

//elimniar proyecto
router.delete('/:id', 
auth,
proyectoController.eliminarProyecto);



module.exports = router;