const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth=require('../middleware/auth');
const {check} = require('express-validator');



//crea tareas
//api/tareas

//crear la tarea
router.post('/', auth,
[
     check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty(),
     check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
],
tareaController.crearTarea);
 //obtener las tareas
router.get('/', auth,
[
     check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
],
tareaController.listarTareasProyecto);
//actualizar tareas via id
router.put('/:id', auth,
tareaController.actualizarTarea);

//eliminar tareas via id
router.delete('/:id', 
auth,
tareaController.eliminarTarea);





module.exports = router;