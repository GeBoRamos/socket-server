
import { Socket } from 'socket.io';
import socketIO from 'socket.io';

//Informar de desconexión del cliente
export const desconectar = (socket:Socket)=>{
    socket.on('disconnect', ()=>{
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