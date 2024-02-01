
import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';


const usuariosConectados:UsuariosLista = new UsuariosLista();

//Conectar cliente
export const conectarCliente = (id:string) =>{
    const usuario = new Usuario(id);
    usuariosConectados.agregar(usuario);
    console.log(usuariosConectados.getLista());
    
}

//Informar de desconexión del cliente
export const desconectar = (socket:Socket)=>{
    socket.on('disconnect', ()=>{
        const usuarioEliminado = usuariosConectados.borrarUsuario(socket.id)
        console.log(`Ha sido eliminado el usuario ${usuarioEliminado?.nombre} con el id ${usuarioEliminado?.id}`)
        console.log('Cliente desconectado')
    })
}

//Escuchar mensaje recibido, y enviarlo a todos los clientes
export const mensaje = (socket: Socket, io:socketIO.Server)=>{
    socket.on('mensaje', (data)=>{
        console.log(data);

        io.emit('mensaje-nuevo', data)

    })
}

export const configurarUsuario = (socket:Socket) =>{
    //El callback es opcional en el .on, pero en este caso queremos que haya respuesta al front.
    //El callback del .emit tambien es opcional.
    socket.on('configurar-usuario', (data, callback)=>{

        console.log('Configurando usuario', data.nombre);
        usuariosConectados.actualizarNombre(socket.id, data.nombre)
        console.log(usuariosConectados.getLista())
        callback({
            ok:true,
            mensaje: `Usuario ${data.nombre} correctamente configurado`})
    })
}