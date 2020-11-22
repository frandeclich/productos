let fs=require('fs')
module.exports=acciones={
    archivo:'./productos.json',
    leer:function(){
        let leyendo=fs.readFileSync(this.archivo,'utf-8')
        return JSON.parse(leyendo)
    },
    escribir:function(id,name, price){
        let nuevoProducto={
            id:id,
            name:name,
            price:price
        }
        let productosBase=this.leer()
        productosBase.push(nuevoProducto)
        this.guardar(productosBase)
    },
    guardar:function(data){
        let nuevoJson=JSON.stringify(data)
        fs.writeFileSync(this.archivo,nuevoJson,'utf-8')
    },
    deshacer:function(){
        let productosBase=this.leer()
        productosBase.pop()
        this.guardar(productosBase)
    },
    buscar:function(busqueda){
        let productos=this.leer()
        let productoBuscado=productos.filter(function(producto){
            return producto.name.toLowerCase().includes(busqueda.toLowerCase())
        })
        return productoBuscado
    },
    filtrar:function(minimo,maximo){
        let productos=this.leer()
        let productosFiltrados=productos.filter(function(producto){
            return producto.price>=minimo &&producto.price<=maximo
        })
        return productosFiltrados
    },
    editar:function(idB,precioN){
        let productos=this.leer()
        let productosCambiados=productos.filter(function(producto){
        if(producto.id==idB){
            producto.price=precioN
            }
        return productos
        })
        this.guardar(productosCambiados)
    },
    eliminar:function(idB){
        let productos=this.leer()
        let filtramos=productos.filter(function(producto){
            return producto.id !==idB
        })
        this.guardar(filtramos)
    }
    /* editar:function(idB,precioN){
        let productos=this.leer()
        productos.forEach(producto => {
            if (producto.id===idB){
            let precioV=producto.price
            let reemplazo=producto.replace(precioV,precioN)
            return reemplazo
        }})
    } */
}
//console.log(acciones.editar(28,15))
