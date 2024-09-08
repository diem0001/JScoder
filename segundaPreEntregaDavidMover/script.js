//SIMULADOR CARRITO DE COMPRAS

//creamos la clase para los productos

class productos{
constructor(id,nombre,precio){

   this.id = id;
   this.nombre = nombre;
   this.precio = precio; 

}

}

//instanciamos los productos
const product =[
    new productos (1,"Mesa",100),
    new productos (2,"Silla",50),
    new productos (3,"Puerta",150),
]

//carrito vacio 
let carrito = []

//funcion para mostrar productos
function mostrarProductos(){
    
    console.log("Productos disponibles:");
    product.forEach(producto =>{
    console.log(`${producto.id}: ${producto.nombre} - ${producto.precio} `);
    });
};

//funcion para agregar productos

function agregarProductos(){
    let idProducto = parseInt( prompt("ingrese el id del producto: "));
    let producto = product.find(prod => prod.id === idProducto);

    if (producto){
        carrito.push(producto)
        console.log(`${producto.nombre} fue agregado al carrito`);
    }else{
        console.log("producto no encontrado");
    }

}

//funcion para mostrar carrito

function mostrarCarrito(){
    if(carrito.length === 0){
        console.log("el carrito esta vacio");
    }else{
        console.log("Productos en el carrito: ");
        carrito.forEach(produc => {
            console.log(`${produc.nombre} - ${produc.precio}`);
        });
    };
    const totalCarrito = carrito.reduce((acc,item)=> acc + item.precio, 0);
    console.log(`Total = ${totalCarrito}`);
}

//funcion para el menu
function menu(){
    let opcion;
    do{
        opcion = prompt("Elija una opcion: \n1. Mostrar productos \n2. Agregar producto al carrito \n3. Ver carrito \n4. Salir");
        switch(opcion){
            case "1":
                mostrarProductos();
                break;
            case "2":
                agregarProductos();
                break;
            case "3":
                mostrarCarrito();
                break;
            case "4":
                console.log("gracias por comprar!");
                break;
            default:
                console.log("opcion no valida");
            
            
        }
    
    }while(opcion !== "4");
}

menu();