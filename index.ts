import Server from "./classes/server";
import { router } from "./routes/routes";
import bodyParser from 'body-parser';
import cors from 'cors';




const server = new Server();

//BodyParser (Configuración: Es para convertir lo que posteo a un objeto json de js. Se debe de poner antes de las rutas, ya que repercute sobre estas.
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());

//CORS
server.app.use( cors({origin: true, credentials: true}));//Estoy permitiendo que colquier persona pueda llamar a mis servicios (desde otro host)


//Rutas
server.app.use('/', router);





server.start();