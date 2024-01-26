import { Router, Request, Response } from 'express';

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
    res.status(200).json({
        Respuesta:'Todo correcto!',
        nombre,
        apellidos,
        id
    })
})