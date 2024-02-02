import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as sockets from '../sockets/socket';

export default class Server{

    private static _instance: Server;   
    public app:express.Application;
    public port:number;
    public io: socketIO.Server;
    public httpServer: http.Server;

    //Ponemos el constructor privado para no poder crear mas instancias de esta clase ya que creariamos mas conexiones de sockets y podriamos
    //obtener errores. En el caso del index.ts, como si que se crea una instancia de esta clase, debemos de hacer un getter de una propiedad,
    //que contendra la clase, con lo que conseguiremos una instancia.
    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        //Socket.io no es compatible con el servidor de express, por lo que tenemos que usar un intermediario como es http y levantar el
        //servidor http con la configuracion de nuestro servidor y pasarlo como parametro a los sockets.
        this.httpServer = new http.Server(this.app);
        this.io = new socketIO.Server(this.httpServer, { cors: { origin: true, credentials: true } });

        this.escucharSockets()
    }

    public static get instance(){
        //Si ya hay una instancia, devuelve this._instance, sino devuelve una nueva instancia de la clase Server. new this() es lo mismo que
        //new Server(). Con esto conseguimos que unicamente haya una instancia de esta clase.
        return this._instance || (this._instance = new this())
    }

    private escucharSockets(){

        console.log('Escuchando conexiones - sockets')

        this.io.on('connection', (socket)=>{

            console.log('Cliente conectado');
            console.log(socket.id)

            //Conectar cliente
            sockets.conectarCliente(socket.id)

            //Configurar usuario
            sockets.configurarUsuario(socket, this.io);

            //Desconectar
            sockets.desconectar(socket, this.io);
            
            //Mensajes
            sockets.mensaje(socket, this.io);

            //Emision usuarios activos al inicio de la page /mensajes
            sockets.obtenerUsuarios(socket, this.io);
            
        })
    }

    start(){
        this.httpServer.listen(this.port, ()=>{
            console.log('El servidor esta corriendo en el puerto' + this.port);
        });
    }
}
