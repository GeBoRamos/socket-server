import { Usuario } from "./usuario";

export class UsuariosLista{

    private lista: Usuario[]

    constructor(){
        this.lista = []
    }

    public agregar (usuario:Usuario){
        this.lista.push(usuario);
        return usuario;
    }

    public actualizarNombre (id:string, nombre: string){
        for(let usuario of this.lista){
            if(usuario.id == id){
                usuario.nombre = nombre;
                break
            }
        }

        console.log('Actualizando usuario');
        
        // console.log(this.lista);
        

        //Esta forma de aqui abajo tambien es valida y hace lo mismo que el for de arriba.(En el forEach no se puede usar el break. Por tanto sin un return no podemos cortar el bucle)
        // this.lista.forEach(usuario=>{
        //     if(usuario.id == id){
        //         usuario.nombre = nombre;
        //         console.log(this.lista)
        //         return usuario;
        //     }
        // })
    }

    public getLista(){
        return this.lista;
    }

    public getUsuario (id:string){
        return this.lista.find(usuario=>{
            return usuario.id == id;
        })
    }

    public getUsuariosSala(sala:string){
        return this.lista.filter(usuario=> usuario.sala == sala);
    }

    public borrarUsuario (id:string){
        const usuarioTemporal = this.getUsuario(id);
        this.lista = this.lista.filter(usuario=>usuario.id != id);

        return usuarioTemporal;
    }
}