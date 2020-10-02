const express = require('express');
const conectarDB = require('./config/db')
const cors = require('cors');

//crear el servidor
const app = express();
conectarDB();
//habilitar cors

app.use(cors());


//puerto servidor 4000


//habilitar express.json

app.use(express.json({extended: true}));

const PORT = process.env.PORT || 4000;

//importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));
//definir pagina principal
app.get('/',(req,res)=>{
     res.send('Hola mundo')
}
);


//arrancar app
 app.listen(PORT, ()=>{
      console.log(`El servidor esta funcionando en el puerto ${PORT}`)
 })

