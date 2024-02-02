import { Router, Request, Response, request } from 'express';
import Server from '../classes/server';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Socket } from 'socket.io';
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

router.post('/mensajeNuevo/:id', (req: Request, res:Response)=>{
    console.log(req.body);

    const nombre: string = req.body.Nombre;
    const apellidos: string = req.body.Apellidos;
    const id: string = req.params.id;

    // res.status(200).json({
    //     Respuesta:'Todo correcto!',
    //     nombre: nombre,
    //     apellidos: apellidos,
    //     id: id
    // })

    //LO DE ARRIBA ES IGUAL A LO DE ABAJO. ESTO ES PORQUE LA PROPIEDAD Y LA VARIABLE DEL JSON, SON IGUALES!

    const server = Server.instance;
    server.io.in(id).emit('mensaje-privado', req.body)

    res.status(200).json({
        Respuesta:'Todo correcto!',
        nombre,
        apellidos,
        id
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