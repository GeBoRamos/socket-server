
import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';


export const usuariosConectados:UsuariosLista = new UsuariosLista();

//Conectar cliente
export const conectarCliente = (id:string) =>{
    const usuario = new Usuario(id);
    usuariosConectados.agregar(usuario);
    console.log(usuariosConectados.getLista());
    
}

//Informar de desconexión del cliente
export const desconectar = (socket:Socket, io:socketIO.Server)=>{
    socket.on('disconnect', ()=>{
        const usuarioEliminado = usuariosConectados.borrarUsuario(socket.id);
        io.emit('usuarios-activos', usuariosConectados.getLista());
        console.log(`Ha sido eliminado el usuario ${usuarioEliminado?.nombre} con el id ${usuarioEliminado?.id}`);
        console.log('Cliente desconectado');
    })
}

//Escuchar mensaje recibido, y enviarlo a todos los clientes
export const mensaje = (socket: Socket, io:socketIO.Server)=>{
    socket.on('mensaje', (data)=>{
        console.log(data);

        io.emit('mensaje-nuevo', data);

    })
}

export const configurarUsuario = (socket:Socket, io:socketIO.Server) =>{
    //El callback es opcional en el .on, pero en este caso queremos que haya respuesta al front.
    //El callback del .emit tambien es opcional.
    socket.on('configurar-usuario', (data, callback)=>{

 //       console.log('Configurando usuario', data.nombre, 'iddddddddddd', socket.id);
        console.log('idddddddddddddddddddddddddd');
        var usuarioYaEnUso:boolean | undefined = false;
        usuarioYaEnUso = usuariosConectados.actualizarNombre(socket.id, data.nombre)
        io.emit('usuarios-activos', usuariosConectados.getLista())
        console.log(usuariosConectados.getLista())
        callback({
            ok:true,
            mensaje: `Usuario ${data.nombre} correctamente configurado`,
            id:socket.id,
            usuarioYaEnUso})
    })
}

export const obtenerUsuarios = (socket:Socket, io:socketIO.Server)=>{
    socket.on('obtener-usuarios', ()=>{
        io.in(socket.id).emit('usuarios-activos', usuariosConectados.getLista())
    })
}