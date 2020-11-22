let proceso=require('process')
var moduloProductos = require('./moduloProductos')
let queDesea=proceso.argv[2]
switch(queDesea){
    case'enumerar':
        let productos=moduloProductos.leer()
        if(productos.length===0){
            console.log('Disculpá, amigo, no te encontré nada para hacer en tu lista más vacía que tu alma.')
        }
        else{
            console.log('LISTA DE PRODUCTOS.')
            for(let i=0;i<productos.length;i++){
                console.log('-Producto número '+productos[i].id+': '+productos[i].name+', precio: '+productos[i].price+' $.')
            }
        }
        break;
    case'agregar':
        let productosTodos=moduloProductos.leer()
        //let id=(productosTodos[(productosTodos.length-1)].id+1)
        let lastId=1
        productosTodos.map(function(producto){
            if(producto.id>lastId){
                lastId=producto.id
            }
        })
        let nombre=proceso.argv[3]
        let precio=Number(proceso.argv[4])
        moduloProductos.escribir(lastId+1,nombre,precio)
        console.log("¡La tarea se ha agregado correctamente!")
        break;
    case'deshacer':
        let productosproductos=moduloProductos.leer()
        let id2=(productosproductos[(productosproductos.length-1)].id)
        moduloProductos.deshacer()
        console.log('La tarea número '+id2+' ha sido eliminada correctamente.')
        break;
    case'buscar':
        let queBusca=proceso.argv[3]
        let busqueda=moduloProductos.buscar(queBusca)
        console.log('Este es el resultado de su búsqueda:')
        for(let i=0;i<busqueda.length;i++){
            console.log('-Producto número '+busqueda[i].id+'. Nombre: '+busqueda[i].name+'; precio: '+busqueda[i].price+' $.')
        }
        break;
    case'filtrar':
        let minimo=proceso.argv[3]
        let maximo=proceso.argv[4]
        let filtracion=moduloProductos.filtrar(minimo,maximo)
        console.log('Filtrando todos los productos entre '+minimo+' y '+maximo+' $:')
        for(let i=0;i<filtracion.length;i++){
            console.log('-Producto número '+filtracion[i].id+'. Nombre: '+filtracion[i].name+'; precio: '+filtracion[i].price+' $.')
        }
        break;
    case'editar':
        let idB=Number(proceso.argv[3])
        let precioN=Number(proceso.argv[4])
        moduloProductos.editar(idB,precioN)
        console.log('Has editado el producto número '+idB)
        break
    case'eliminar':
        let idE=Number(proceso.argv[3])
        moduloProductos.eliminar(idE)
        console.log('Producto número '+idE+' eliminado.')
        break
    case'ayuda':
        console.log('-Para usar "enumerar", escriba "enumerar" después de ejecutar el código.')
        console.log('-Para usar "agregar", escriba "agregar" y luego el título y el estado de la tarea. Si son varias palabras, use comillas.')
        console.log('-Para usar "buscar", escriba "buscar", y luego el título de la tarea que está buscando. Si está compuesto por varias palabras, escríbalo entre comillas.')
        console.log('-Para usar "filtrar", escriba "filtrar" y el precio mínimo y máximo, para que se retornen los productos que tienen un precio entre estos.')
        console.log('-Para usar "deshacer", escriba "deshacer" y eliminará la última tarea agregada.')
        break;
    //MODIFICAR PRECIO DE UN PRODUCTO ESPECÍFICO
    //ELIMINAR PRODUCTO ESPECÍFICO
    default:
        console.log('Disculpe, no puso ninguna acción.')
        setTimeout(()=>console.log('Las opciones son: enumerar, agregar, buscar, filtrar o deshacer. Si no sabe usarlas, tipee "ayuda".'),2000)
}