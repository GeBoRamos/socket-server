import { Router, Request, Response, request } from 'express';
import Server from '../classes/server';
import * as sockets from '../sockets/socket';


export const router = Router();

router.get('/mensajes', (req: Request, res:Response)=>{
    res.status(200).json({
        mensaje:'Hola!',
        autor:'German'
    })
})

router.post('/mensajeNuevo', (req: Request, res:Response)=>{
    console.log(req.body);

    const nombre:string = req.body.Nombre;
    const apellidos: string = req.body.Apellidos;

    const msg ={
        de:nombre,
        cuerpo:apellidos
    }

    const server = Server.instance;
    server.io.emit('mensaje-nuevo', msg)

    res.status(200).json({
        Respuesta:'Todo correcto!',
        Nombre: nombre,
        Apellidos: apellidos
    })
})

router.post('/mensajeNuevo/:idReceptor/:idEmisor', (req: Request, res:Response)=>{

    const de: string = req.body.de;
    const cuerpo: string = req.body.cuerpo; 
    const nombreReceptor = req.body.nombreReceptor;
    const privateMsg:boolean = true;
    const bodyEmisor = {de, cuerpo, nombreReceptor, privateMsg};
    const bodyReceptor = {de, cuerpo, privateMsg};
    const idReceptor: string = req.params.idReceptor;
    const idEmisor: string = req.params.idEmisor;

    // res.status(200).json({
    //     Respuesta:'Todo correcto!',
    //     nombre: nombre,
    //     apellidos: apellidos,
    //     id: id
    // })

    //LO DE ARRIBA ES IGUAL A LO DE ABAJO. ESTO ES PORQUE LA PROPIEDAD Y LA VARIABLE DEL JSON, SON IGUALES!

    const server = Server.instance;
    server.io.in(idReceptor).emit('mensaje-privado', bodyReceptor);
    server.io.in(idEmisor).emit('mensaje-privado', bodyEmisor);

    res.status(200).json({
        Respuesta:'Todo correcto!',
        de,
        cuerpo,
        idReceptor,
        idEmisor
    })
})

router.get('/usuarios',(req:Request, res:Response)=>{
    
    try{
        const server = Server.instance;
        const clients = server.io.sockets.sockets;
        const clientsId: string[] = [];

        clients.forEach(client =>{
            clientsId.push(client.id)
        })

        return res.status(200).json({
            ok: false,
            clientsId
        })      
    }catch(error){
        res.json({
            ok:false,
            error
        })
    }
})

router.get('/usuarios/detalle', (req:Request, res:Response)=>{

    try{
        const listaUsuarios = sockets.usuariosConectados.getLista();

        return res.status(200).json({
            ok: true,
            usuarios: listaUsuarios
        })

    }catch(error){

        return res.json({
            ok:false,
            error
        })
    }
    

    
    
})